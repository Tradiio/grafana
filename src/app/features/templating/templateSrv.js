define([
  'angular',
  'lodash',
  'kbn',
  './editorCtrl',
  './templateValuesSrv',
],
function (angular, _, kbn) {
  'use strict';

  var module = angular.module('grafana.services');

  module.service('templateSrv', function() {
    var self = this;

    this._regex = /\$(\w+)|\[\[([\s\S]+?)\]\]/g;
    this._values = {};
    this._texts = {};
    this._grafanaVariables = {};

    this.init = function(variables) {
      this.variables = variables;
      this.updateTemplateData();
    };

    this.updateTemplateData = function() {
      this._values = {};
      this._texts = {};

      _.each(this.variables, function(variable) {
        if (!variable.current || !variable.current.value) { return; }

        this._values[variable.name] = variable.current.value;
        this._texts[variable.name] = variable.current.text;
      }, this);
    };

    this.setGrafanaVariable = function (name, value) {
      this._grafanaVariables[name] = value;
    };

    this.variableExists = function(expression) {
      this._regex.lastIndex = 0;
      var match = this._regex.exec(expression);
      return match && (self._values[match[1] || match[2]] !== void 0);
    };

    this.containsVariable = function(str, variableName) {
      return str.indexOf('$' + variableName) !== -1 || str.indexOf('[[' + variableName + ']]') !== -1;
    };

    this.highlightVariablesAsHtml = function(str) {
      if (!str || !_.isString(str)) { return str; }

      this._regex.lastIndex = 0;
      return str.replace(this._regex, function(match, g1, g2) {
        if (self._values[g1 || g2]) {
          return '<span class="template-variable">' + match + '</span>';
        }
        return match;
      });
    };

    this.replace = function(target) {
      if (!target) { return; }

      var value;
      this._regex.lastIndex = 0;

      return target.replace(this._regex, function(match, g1, g2) {
        value = self._values[g1 || g2];
        if (!value) { return match; }

        return self._grafanaVariables[value] || value;
      });
    };

    this.replaceWithText = function(target) {
      if (!target) { return; }

      var value;
      var text;
      this._regex.lastIndex = 0;

      return target.replace(this._regex, function(match, g1, g2) {
        value = self._values[g1 || g2];
        text = self._texts[g1 || g2];
        if (!value) { return match; }

        return self._grafanaVariables[value] || text;
      });
    };

    this.setQueryStats = function(variable) {

      var stats = [];
      var statsTable    = variable.stats_table;
      var statsVariable = variable.stats_variable;
      var time          = {};

      var d           = new Date();
      var dayDiff     = 1;
      var weekDiff    = d.getDay() == 0 ? d.getDay() + 6 : d.getDay() - 1;

      time['current_day']   = kbn.parseDate('now');
      time['previous_day']  = kbn.parseDate('now-' + dayDiff + 'd');

      time['current_week']  = kbn.parseDate('now-'    + weekDiff + 'd');
      time['previous_week'] = kbn.parseDate('now-7d-' + weekDiff + 'd');

      time['current_month']  = new Date();
      time['previous_month'] = new Date();
      time['current_month'].setDate(1);
      time['previous_month'].setMonth(time['current_month'].getMonth() - 1, 1);

      _.each(time, function(value, key){
        time[key] = kbn.formatDate(value);
      });

      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['current_day']),   "var" : "current_day"});
      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['current_week']),  "var" : "current_week"});
      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['current_month']), "var" : "current_month"});

      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['previous_day'],   time['current_day']), "var" : "previous_day"});
      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['previous_week'],  time['current_week']), "var" : "previous_week"});
      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['previous_month'], time['current_month']), "var" : "previous_month"});

      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['previous_day'],   'now()-1d'),  "var" : "relative_day"});
      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['previous_week'],  'now()-7d'),  "var" : "relative_week"});
      stats.push({"query" : self.setInfluxDbQueryStat(statsTable, statsVariable, variable.distinct, time['previous_month'], 'now()-30d'), "var" : "relative_month"});

      return stats;

    };

    this.setInfluxDbQueryStat = function(table, row, distinct, startTime, endTime) {

      var rowClause   = distinct ? "distinct(" + row + ")" : row;
      var whereClause = endTime ? " where time > " + startTime + " and time < " + endTime : " where time > " + startTime;

      return "select count(" + rowClause + ") from " + table + whereClause;

    };

  });

});

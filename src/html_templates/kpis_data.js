function loadObjectives() {
  var objectives    = {
    "ARTISTCOUNT": {"2015-02-01" :  1300, "2015-03-01" :   1700, "2015-04-01" :   2834, '2015-05-01' :   3200, '2015-06-01' :   4000, '2015-07-01' :   4800,
                    '2015-08-01' :  5600, '2015-09-01' :   6400, '2015-10-01' :   7300, '2015-11-01' :   8200, '2015-12-01' :   9100},

    "MNAPT":       {"2015-02-01" :    50, "2015-03-01" :    100, "2015-04-01" :    100, '2015-05-01' :    100, '2015-06-01' :    100, '2015-07-01' :    100,
                    '2015-08-01' :   100, '2015-09-01' :    100, '2015-10-01' :    100, '2015-11-01' :    100, '2015-12-01' :    100},

    "MNAGB":       {"2015-02-01" :   200, "2015-03-01" :    500, "2015-04-01" :    500, '2015-05-01' :    500, '2015-06-01' :    500, '2015-07-01' :    500,
                    '2015-08-01' :   500, '2015-09-01' :    500, '2015-10-01' :    500, '2015-11-01' :    500, '2015-12-01' :    500},

    "MNAINT":      {"2015-02-01" :    50, "2015-03-01" :    100, "2015-04-01" :    150, '2015-05-01' :    150, '2015-06-01' :    200, '2015-07-01' :    200,
                    '2015-08-01' :   200, '2015-09-01' :    200, '2015-10-01' :    300, '2015-11-01' :    300, '2015-12-01' :    300},

    "MNAALL":      {"2015-02-01" :   300, "2015-03-01" :    700, "2015-04-01" :    750, '2015-05-01' :    750, '2015-06-01' :    800, '2015-07-01' :    800,
                    '2015-08-01' :   800, '2015-09-01' :    800, '2015-10-01' :    900, '2015-11-01' :    900, '2015-12-01' :    900},

    "USERCOUNT":   {"2015-02-01" :  3200, "2015-03-01" :  15900, "2015-04-01" :  31071, '2015-05-01' :  32100, '2015-06-01' :  44500, '2015-07-01' :  60900,
                    '2015-08-01' : 83600, '2015-09-01' : 115100, '2015-10-01' : 159000, '2015-11-01' : 220500, '2015-12-01' : 306700},

    "MNUPT":       {"2015-02-01" :  1400, "2015-03-01" :   1500, "2015-04-01" :   1600, '2015-05-01' :   1600, '2015-06-01' :   1700, '2015-07-01' :   1300,
                    '2015-08-01' :  1400, '2015-09-01' :   1400, '2015-10-01' :   1400, '2015-11-01' :   1500, '2015-12-01' :   1500},

    "MNUGB":       {"2015-02-01" :  1800, "2015-03-01" :  11200, "2015-04-01" :   5400, '2015-05-01' :   7600, '2015-06-01' :  10700, '2015-07-01' :  15100,
                    '2015-08-01' : 21300, '2015-09-01' :  30100, '2015-10-01' :  42500, '2015-11-01' :  60000, '2015-12-01' :  84700},

    "MNUINT":      {"2015-02-01" :     0, "2015-03-01" :      0, "2015-04-01" :   3000, '2015-05-01' :    600, '2015-06-01' :    800, '2015-07-01' :      0,
                    '2015-08-01' :   900, '2015-09-01' :   1100, '2015-10-01' :   1400, '2015-11-01' :   1700, '2015-12-01' :  22000},

    "MNUALL":      {"2015-02-01" :  3200, "2015-03-01" :  12700, "2015-04-01" :  10000, '2015-05-01' :   9800, '2015-06-01' :  13200, '2015-07-01' :  16400,
                    '2015-08-01' : 23600, '2015-09-01' :  32600, '2015-10-01' :  45300, '2015-11-01' :  63200, '2015-12-01' : 108200},

    "AU":          {"2015-02-01" :  1280, "2015-03-01" :   9654, "2015-04-01" :  10500, '2015-05-01' :  14645, '2015-06-01' :  18441, '2015-07-01' :  23259,
                    '2015-08-01' : 30463, '2015-09-01' :  40467, '2015-10-01' :  54327, '2015-11-01' :  73701, '2015-12-01' : 108754},

    "MAU":         {"2015-02-01" :    40, "2015-03-01" :     61, "2015-04-01" :     35, '2015-05-01' :     46, '2015-06-01' :     41, '2015-07-01' :     38,
                    '2015-08-01' :    36, '2015-09-01' :     35, '2015-10-01' :     34, '2015-11-01' :     33, '2015-12-01' :     35}
  };

  return objectives;

}

function loadKPIs() {

  var kpis = [
    {"title" : "Artist Base", "type" : "artist", "objective" : "ARTISTCOUNT"},

    {"title" : "MNA", "type" : "artist",  "origin" : "PT",  "objective" : "MNAPT"},
    {"title" : "MNA", "type" : "artist",  "origin" : "GB",  "objective" : "MNAGB"},
    {"title" : "MNA", "type" : "artist",  "origin" : "INT", "objective" : "MNAINT"},
    {"title" : "MNA", "type" : "artist",  "origin" : "ALL", "objective" : "MNAALL"},

    {"title" : "User Base", "type" : "user", "objective" : "USERCOUNT"},

    {"title" : "MNU", "type" : "user",  "origin" : "PT",  "objective" : "MNUPT"},
    {"title" : "MNU", "type" : "user",  "origin" : "GB",  "objective" : "MNUGB"},
    {"title" : "MNU", "type" : "user",  "origin" : "INT", "objective" : "MNUINT"},
    {"title" : "MNU", "type" : "user",  "origin" : "ALL", "objective" : "MNUALL"},

    {"title" : "AU",  "type" : "active_user",  "objective" : "AU"},
    {"title" : "MAU",  "type" : "active_user",  "percentage" : true, "objective" : "MAU"}

  ];

  return kpis;
}
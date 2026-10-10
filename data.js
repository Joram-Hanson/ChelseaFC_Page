/* 
   data.js  -  ALL THE INFORMATION FOR THE WEBSITE LIVES IN THIS FILE
   ---------------------------------------------------------------------
   The page layout is in the HTML files, the looks are in style.css and
   the behaviour is in script.js. This file only holds data (arrays and
   objects).

    */

"use strict";


  // 1. IMAGE PATHS
  
const images = {
  stadium: "images/chelsea club.jpg",  
  trophies: "images/trophies.jpg"  
};

/* ---------------------------------------------------------------------
   2. THE FOUR SECTIONS (used by the details page and the nav)
   The key (history, trophies...) is what appears after ?section= in the
   address bar, for example details.html?section=history
   --------------------------------------------------------------------- */
const sections = {
  history: {
    title: "History",
    intro: "From a pub meeting in 1905 to two Champions League titles, here is how Chelsea became one of the biggest clubs in the world."
  },
  trophies: {
    title: "Trophies",
    intro: "Thirty major trophies and counting. Filter by competition and tap a trophy to see the years it was won."
  },
  halloffame: {
    title: "Hall of Fame",
    intro: "Ten players who shaped the club's story, from the 1960s heroes to the modern-day greats."
  },
  squad: {
    title: "Current squad",
    intro: "The 2026/27 first team under head coach Xabi Alonso, with the club each player joined from."
  }
};

// Order used for the nav and the "Keep exploring" links 
const sectionOrder = ["history", "trophies", "halloffame", "squad"];


  // 3. CLUB FACTS (history page)
 
const clubFacts = [
  { label: "Founded", value: "10 March 1905" },
  { label: "Nickname", value: "The Blues" },
  { label: "Stadium", value: "Stamford Bridge, Fulham, London" },
  { label: "Capacity", value: "Around 40,000" },
  { label: "Owner", value: "Clearlake Capital" },
  { label: "Head coach", value: "Xabi Alonso" },
  { label: "Last season", value: "10th in the Premier League (2025/26)" }
];


   //4. TIMELINE (history page). Each year becomes a button.
   
const timeline = [
  {
    year: "1905",
    title: "A club is born",
    text: "Chelsea Football Club is founded at a meeting in The Rising Sun pub, opposite the Stamford Bridge ground. The club takes the name of the neighbouring borough because Fulham already had a team."
  },
  {
    year: "1955",
    title: "First league title",
    text: "Chelsea win the First Division for the first time. It would take 50 years for the next league championship to arrive."
  },
  {
    year: "1970",
    title: "First FA Cup",
    text: "Led by captain Ron Harris and striker Peter Osgood, Chelsea beat Leeds United in a replay to win the FA Cup for the first time."
  },
  {
    year: "1971",
    title: "First European trophy",
    text: "Chelsea win the UEFA Cup Winners' Cup, beating Real Madrid in a replay in Athens."
  },
  {
    year: "2003",
    title: "A new era begins",
    text: "Roman Abramovich buys the club. Big signings and a series of top managers follow, and the trophies start to arrive in large numbers."
  },
  {
    year: "2005",
    title: "Champions of England again",
    text: "Under José Mourinho, Chelsea win the Premier League and end a 50-year wait for a league title. They retain it in 2006."
  },
  {
    year: "2012",
    title: "Champions of Europe",
    text: "Chelsea beat Bayern Munich in their own stadium to win the Champions League for the first time. Didier Drogba scores a late equaliser and then the winning penalty."
  },
  {
    year: "2021",
    title: "A second Champions League",
    text: "A 1-0 win over Manchester City in the final makes Chelsea European champions for the second time."
  },
  {
    year: "2022",
    title: "New owners",
    text: "A consortium led by Todd Boehly and Clearlake Capital completes the purchase of the club on 30 May 2022."
  },
  {
    year: "2025",
    title: "Every UEFA trophy",
    text: "Chelsea win the Conference League, becoming the first club to win all five major UEFA competitions. A few weeks later they beat Paris Saint-Germain 3-0 to win the Club World Cup."
  },
  {
    year: "2026",
    title: "Clearlake take full control",
    text: "On 16 September 2026, Clearlake Capital agrees to buy out Todd Boehly and Mark Walter. Boehly steps down as chairman and Clearlake assumes full control of the club."
  }
];


  // 5. OWNERSHIP AND LEADERSHIP (history page)
  
const leadership = {
  owner: "Clearlake Capital took full control of the club on 16 September 2026, buying out the stakes held by Todd Boehly and Mark Walter. Co-founder Behdad Eghbali leads Clearlake's involvement, and Hansjörg Wyss remains a stakeholder in the ownership group.",
  chairman: "Todd Boehly was chairman from June 2022 until he stepped down in September 2026. The club's website will show who leads the board next.",
  coach: "Xabi Alonso is the head coach for the 2026/27 season and has rebuilt the squad this summer."
};

/* 
   6. TROPHIES (men's team, major honours)
   category is used by the filter buttons: league | domestic | europe | world
   id is also used by the counters on the home page (data-trophy="...")
    */
const trophies = [
  {
    id: "league",
    name: "League champions",
    count: 6,
    category: "league",
    years: [1955, 2005, 2006, 2010, 2015, 2017],
    note: "First Division and Premier League titles."
  },
  {
    id: "facup",
    name: "FA Cup",
    count: 8,
    category: "domestic",
    years: [1970, 1997, 2000, 2007, 2009, 2010, 2012, 2018],
    note: "England's oldest cup competition."
  },
  {
    id: "leaguecup",
    name: "League Cup",
    count: 5,
    category: "domestic",
    years: [1965, 1998, 2005, 2007, 2015],
    note: "The Carabao Cup, formerly the League Cup."
  },
  {
    id: "ucl",
    name: "Champions League",
    count: 2,
    category: "europe",
    years: [2012, 2021],
    note: "Europe's biggest club prize."
  },
  {
    id: "uel",
    name: "Europa League",
    count: 2,
    category: "europe",
    years: [2013, 2019],
    note: "Won in 2013 and again in 2019."
  },
  {
    id: "uecl",
    name: "Conference League",
    count: 1,
    category: "europe",
    years: [2025],
    note: "Completed the set of five UEFA trophies."
  },
  {
    id: "cwc",
    name: "Cup Winners' Cup",
    count: 2,
    category: "europe",
    years: [1971, 1998],
    note: "Chelsea's first and second European trophies."
  },
  {
    id: "supercup",
    name: "UEFA Super Cup",
    count: 2,
    category: "europe",
    years: [1998, 2021],
    note: "Played between the winners of Europe's two main competitions."
  },
  {
    id: "clubworldcup",
    name: "FIFA Club World Cup",
    count: 2,
    category: "world",
    years: [2021, 2025],
    note: "World champions twice, the only London club to do it."
  }
];


  // 7. DID YOU KNOW? (home page button)
  
const facts = [
  "Chelsea are the first club to win all five major UEFA club competitions.",
  "Frank Lampard is Chelsea's record goalscorer with 211 goals.",
  "Ron Harris holds the club record for appearances with 795 games.",
  "Chelsea are the only London club to have won both the Champions League and the Club World Cup.",
  "In 2013 Chelsea held the Champions League and the Europa League at the same time. No other club has done that.",
  "Chelsea beat Paris Saint-Germain 3-0 in the 2025 Club World Cup final.",
  "The club was named after the borough next door because Fulham already had a team."
];


   //8. HALL OF FAME (10 legends)
   
const legends = [
  {
    id: "lampard",
    name: "Frank Lampard",
    role: "Midfielder",
    years: "2001 to 2014",
    games: "648",
    stat: { label: "Goals", value: "211" },
    image: "images/lampard.jpg",
    summary: "Frank Lampard is Chelsea's all-time top scorer with 211 goals, a remarkable record for a midfielder. He joined from West Ham in 2001 and became the engine of the José Mourinho side that won back-to-back Premier League titles in 2005 and 2006. He later returned to the club as manager.",
    honours: ["3 Premier League titles (2005, 2006, 2010)", "4 FA Cups", "2 League Cups", "Champions League 2012", "Europa League 2013"]
  },
  {
    id: "terry",
    name: "John Terry",
    role: "Centre-back and captain",
    years: "1998 to 2017",
    games: "717",
    stat: { label: "Goals", value: "66" },
    image: "images/John Terry.jpg",
    summary: "John Terry came through the academy to become one of the club's greatest captains. A fearless centre-back, he led Chelsea through the most successful period in their history. He was part of the 2012 Champions League win and lifted five Premier League trophies.",
    honours: ["5 Premier League titles", "5 FA Cups", "3 League Cups", "Champions League 2012", "Europa League 2013"]
  },
  {
    id: "drogba",
    name: "Didier Drogba",
    role: "Striker",
    years: "2004 to 2012, 2014 to 2015",
    games: "381",
    stat: { label: "Goals", value: "164" },
    image: "images/drogba.jpg",
    summary: "Didier Drogba signed from Marseille in 2004 and became Chelsea's ultimate big-game player. He scored in four FA Cup finals and, in the 2012 Champions League final, he headed a late equaliser against Bayern Munich and then scored the winning penalty in the shoot-out.",
    honours: ["4 Premier League titles", "4 FA Cups", "3 League Cups", "Champions League 2012"]
  },
  {
    id: "cech",
    name: "Petr Čech",
    role: "Goalkeeper",
    years: "2004 to 2015",
    games: "494",
    stat: { label: "Clean sheets", value: "228" },
    image: "images/Peter Cech.jpg",
    summary: "Petr Čech joined from Rennes in 2004 and was the foundation of the team that won the league the following season, conceding just 15 goals. He holds the club record for clean sheets. After a serious head injury in 2006, he came back wearing a protective headguard and played at the top level for nearly a decade.",
    honours: ["4 Premier League titles", "4 FA Cups", "3 League Cups", "Champions League 2012", "Europa League 2013"]
  },
  {
    id: "zola",
    name: "Gianfranco Zola",
    role: "Forward",
    years: "1996 to 2003",
    games: "229",
    stat: { label: "Goals", value: "59" },
    image: "images/Gianfranco Zola.jpg",
    summary: "Gianfranco Zola arrived from Parma in 1996 and quickly became one of the most loved players in Chelsea's history. A small, quick forward with a magician's touch, he was named the FWA Footballer of the Year in 1997. Fans later voted him the club's greatest ever player.",
    honours: ["2 FA Cups (1997, 2000)", "League Cup 1998", "Cup Winners' Cup 1998", "UEFA Super Cup 1998"]
  },
  {
    id: "hazard",
    name: "Eden Hazard",
    role: "Winger",
    years: "2012 to 2019",
    games: "352",
    stat: { label: "Goals", value: "110" },
    image: "images/Eden Hazard Chelsea Prime.jpg",
    summary: "Eden Hazard joined from Lille in 2012 and spent seven years as Chelsea's chief creator. A dribbler who rarely lost the ball, he won the PFA Players' Player of the Year award in 2015 and scored twice in the 2019 Europa League final before leaving for Real Madrid.",
    honours: ["2 Premier League titles (2015, 2017)", "League Cup 2015", "2 Europa Leagues (2013, 2019)", "PFA Players' Player of the Year 2015"]
  },
  {
    id: "cole",
    name: "Ashley Cole",
    role: "Left-back",
    years: "2006 to 2014",
    games: "338",
    stat: { label: "Goals", value: "7" },
    image: "images/Ashley Cole - Chelsea.jpg",
    summary: "Ashley Cole moved from Arsenal in 2006 and was widely regarded as one of the best left-backs in the world. He was a key part of the side that won the Champions League in 2012, and he has won seven FA Cups across his career.",
    honours: ["Premier League 2010", "4 FA Cups with Chelsea", "League Cup 2007", "Champions League 2012", "Europa League 2013"]
  },
  {
    id: "osgood",
    name: "Peter Osgood",
    role: "Striker",
    years: "1964 to 1974, 1978 to 1979",
    games: "380",
    stat: { label: "Goals", value: "150" },
    image: "images/Peter Osgood.jpg",
    summary: "Peter Osgood, known as 'The King of Stamford Bridge', was the star of Chelsea's exciting team of the late 1960s and early 1970s. He scored in the 1970 FA Cup final replay against Leeds and again in the 1971 Cup Winners' Cup final replay against Real Madrid. There is a statue of him at Stamford Bridge.",
    honours: ["FA Cup 1970", "Cup Winners' Cup 1971"]
  },
  {
    id: "harris",
    name: "Ron “Chopper” Harris",
    role: "Defender",
    years: "1961 to 1980",
    games: "795",
    stat: { label: "Goals", value: "14" },
    image: "images/Terry Cooper.jpg",
    summary: "Ron Harris is Chelsea's record appearance maker, with 795 games over almost two decades. A tough-tackling defender, he captained the side to FA Cup glory in 1970 and the Cup Winners' Cup in 1971, and he also won the League Cup in 1965.",
    honours: ["League Cup 1965", "FA Cup 1970 (captain)", "Cup Winners' Cup 1971 (captain)"]
  },
  {
    id: "makelele",
    name: "Claude Makélélé",
    role: "Defensive midfielder",
    years: "2003 to 2008",
    games: "144",
    stat: { label: "Goals", value: "2" },
    image: "images/claude.jpg",
    summary: "Claude Makélélé joined from Real Madrid in 2003 and became the model for the modern defensive midfielder. So much so that the role is still named after him. Shielding the back four, he helped Chelsea win back-to-back Premier League titles in 2005 and 2006.",
    honours: ["2 Premier League titles (2005, 2006)", "2 League Cups (2005, 2007)", "FA Cup 2007"]
  }
];


   //9. CURRENT SQUAD (2026/27)
   
const squad = [
  /* Goalkeepers */
  {
    name: "Robert Sánchez",
    group: "goalkeeper", role: "Goalkeeper", nationality: "Spain",
    from: "Brighton & Hove Albion",
    achievements: "Spain international who has been Chelsea's first-choice goalkeeper in recent seasons. He was part of the squad that won the Conference League and the Club World Cup in 2025."
  },
  {
    name: "Emiliano Martínez",
    group: "goalkeeper", role: "Goalkeeper", nationality: "Argentina",
    from: "Aston Villa",
    achievements: "Won the 2022 World Cup with Argentina and the Golden Glove as the tournament's best goalkeeper. Also a Copa América winner in 2021 and 2024. Joined in the summer of 2026."
  },

  /* Defenders  */
  {
    name: "Reece James",
    group: "defender", role: "Right-back", nationality: "England",
    from: "Chelsea academy",
    achievements: "Chelsea's club captain. Won the Champions League in 2021 and captained the side that lifted the Conference League and the Club World Cup in 2025."
  },
  {
    name: "Levi Colwill",
    group: "defender", role: "Centre-back", nationality: "England",
    from: "Chelsea academy (loans at Huddersfield and Brighton)",
    achievements: "England international who came through the club's academy. Part of the squad that won the Conference League and the Club World Cup in 2025."
  },
  {
    name: "Wesley Fofana",
    group: "defender", role: "Centre-back", nationality: "France",
    from: "Leicester City",
    achievements: "France international who joined in 2022. Part of the squad that won the Conference League and the Club World Cup in 2025."
  },
  {
    name: "Maxence Lacroix",
    group: "defender", role: "Centre-back", nationality: "France",
    from: "Crystal Palace",
    achievements: "Won the FA Cup and the Community Shield with Palace in 2025. Joined Chelsea for a reported £52m in July 2026."
  },
  {
    name: "Marco Palestra",
    group: "defender", role: "Right-back", nationality: "Italy",
    from: "Atalanta (loan at Cagliari in 2025/26)",
    achievements: "Voted Serie A's Defender of the Year after a season on loan at Cagliari. Capped by Italy and became Chelsea's first signing of summer 2026."
  },
  {
    name: "Malo Gusto",
    group: "defender", role: "Right-back", nationality: "France",
    from: "Lyon",
    achievements: "France international full-back who was part of the 2025 Conference League and Club World Cup winning squads."
  },
  {
    name: "Jorrel Hato",
    group: "defender", role: "Defender", nationality: "Netherlands",
    from: "Ajax",
    achievements: "Dutch international who made his debut for Ajax as a 16-year-old and joined Chelsea in 2025."
  },
  {
    name: "Mamadou Sarr",
    group: "defender", role: "Centre-back", nationality: "France",
    from: "Strasbourg",
    achievements: "Came through at Strasbourg, Chelsea's sister club in the BlueCo group, and travelled with the squad to the 2025 Club World Cup."
  },
  {
    name: "Valentín Barco",
    group: "defender", role: "Left-back", nationality: "Argentina",
    from: "Strasbourg",
    achievements: "Argentina international who started out at Boca Juniors. Joined Chelsea for a reported £34m in August 2026."
  },

  /* Midfielders  */
  {
    name: "Moisés Caicedo",
    group: "midfielder", role: "Defensive midfielder", nationality: "Ecuador",
    from: "Brighton & Hove Albion",
    achievements: "Joined in 2023 for £115m, a British record at the time. Won the Conference League and the Club World Cup with Chelsea in 2025."
  },
  {
    name: "Cole Palmer",
    group: "midfielder", role: "Attacking midfielder", nationality: "England",
    from: "Manchester City",
    achievements: "Premier League Young Player of the Season in 2023/24 and a Euro 2024 finalist with England. Scored twice in the 2025 Club World Cup final win over Paris Saint-Germain."
  },
  {
    name: "Roméo Lavia",
    group: "midfielder", role: "Midfielder", nationality: "Belgium",
    from: "Southampton",
    achievements: "Belgium international who joined in 2023 and was part of the squad that won the Conference League and the Club World Cup in 2025."
  },
  {
    name: "Jordan Henderson",
    group: "midfielder", role: "Midfielder", nationality: "England",
    from: "Brentford",
    achievements: "Captained Liverpool to the 2019/20 Premier League title and won the Champions League in 2019. Has 91 England caps. Joined on a free transfer in August 2026, aged 36."
  },
  {
    name: "Morgan Rogers",
    group: "midfielder", role: "Attacking midfielder", nationality: "England",
    from: "Aston Villa",
    achievements: "England international and Chelsea's record signing, joining for a reported £117m in July 2026."
  },

  /* Forwards  */
  {
    name: "João Pedro",
    group: "forward", role: "Striker", nationality: "Brazil",
    from: "Brighton & Hove Albion",
    achievements: "Scored in the 2025 Club World Cup final and was named Chelsea's Player of the Year for 2025/26."
  },
  {
    name: "Pedro Neto",
    group: "forward", role: "Winger", nationality: "Portugal",
    from: "Wolverhampton Wanderers",
    achievements: "Portugal international winger who joined in 2024 and was part of the 2025 Conference League and Club World Cup winning squads."
  },
  {
    name: "Estêvão",
    group: "forward", role: "Winger", nationality: "Brazil",
    from: "Palmeiras",
    achievements: "Teenage Brazil international nicknamed 'Messinho' who joined from Palmeiras in 2025, aged 18."
  },
  {
    name: "Jamie Gittens",
    group: "forward", role: "Winger", nationality: "England",
    from: "Borussia Dortmund",
    achievements: "Left Manchester City's academy for Dortmund as a teenager before signing for Chelsea in 2025."
  },
  {
    name: "Geovany Quenda",
    group: "forward", role: "Winger", nationality: "Portugal",
    from: "Sporting CP",
    achievements: "Became Sporting's youngest ever league goalscorer in October 2024. Joined Chelsea in July 2026 for a reported £42.5m."
  },
  {
    name: "Emmanuel Emegha",
    group: "forward", role: "Striker", nationality: "Netherlands",
    from: "Strasbourg",
    achievements: "Dutch international who captained Strasbourg and was one of the top scorers in the French league before moving in the summer of 2026."
  },
  {
    name: "Danny Welbeck",
    group: "forward", role: "Striker", nationality: "England",
    from: "Brighton & Hove Albion",
    achievements: "Experienced England striker who also played for Manchester United and Arsenal. Joined for £5m in August 2026, aged 35."
  }
];

export const STREAMS_DATA = [
  {
    id: 'commerce',
    name: 'Commerce',
    icon: 'trending-up',
    subjects: [
      { id: 'economics', name: 'Economics', accent: '#2aaf8f', totalLessons: 12, active: true },
      { id: 'business', name: 'Business Studies', accent: '#d4a040', totalLessons: 8, active: true },
      { id: 'accounting', name: 'Accounting', accent: '#4f8ef7', totalLessons: 10, active: false, comingSoon: true }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: 'code-working',
    subjects: [
      { id: 'ict', name: 'ICT', accent: '#8a5abe', totalLessons: 12, active: true },
      { id: 'engineering_tech', name: 'Engineering Technology', accent: '#fdcb6e', totalLessons: 8, active: false, comingSoon: true },
      { id: 'science_for_tech', name: 'Science for Technology', accent: '#00e5c3', totalLessons: 8, active: false, comingSoon: true }
    ]
  },
  {
    id: 'science',
    name: 'Science / Maths',
    icon: 'calculator',
    subjects: [
      { id: 'combined_maths', name: 'Combined Mathematics', accent: '#e84393', totalLessons: 15, active: false, comingSoon: true },
      { id: 'physics', name: 'Physics', accent: '#d63031', totalLessons: 12, active: false, comingSoon: true },
      { id: 'chemistry', name: 'Chemistry', accent: '#0984e3', totalLessons: 12, active: false, comingSoon: true }
    ]
  },
  {
    id: 'humanities',
    name: 'Humanities / Arts',
    icon: 'book',
    subjects: [
      { id: 'sinhala', name: 'Sinhala', accent: '#e17055', totalLessons: 10, active: false, comingSoon: true },
      { id: 'history', name: 'History', accent: '#6c5ce7', totalLessons: 10, active: false, comingSoon: true }
    ]
  }
];

export const SUBJECTS_DATA = [
  {
    id: 'economics',
    name: 'Economics',
    accent: 'teal',
    lessons: [
      {id:1, title:'Introduction to Economics', desc:'Fundamental concepts — scarcity, choice, opportunity cost, PPC, and basic economic questions.'},
      {id:2, title:'Demand, Supply & Market Equilibrium', desc:'Laws of demand and supply, equilibrium, elasticity, and price determination in markets.'},
      {id:3, title:'Government Intervention in Markets', desc:'Price controls, taxes, subsidies, and effects of government intervention on market outcomes.'},
      {id:4, title:'Production, Cost & Market Structures', desc:'Production functions, costs, economies of scale, and market structures from competition to monopoly.'},
      {id:5, title:'National Accounting', desc:'GDP measurement, national income accounting, circular flow of income, and its limitations.'},
      {id:6, title:'Macroeconomic Concepts', desc:'Aggregate demand/supply, business cycles, unemployment, and macroeconomic policy framework.'},
      {id:7, title:'Price, Inflation, Money & Financial System', desc:'Price indices, inflation, money, financial intermediation, and monetary policy tools.'},
      {id:8, title:'Market Failure, Government & Public Finance', desc:'Externalities, public goods, taxation, government spending, and fiscal policy.'},
      {id:9, title:'Protectionism & Foreign Investments', desc:'Trade barriers, protectionism, FDI, multinational corporations, and global trade dynamics.'},
      {id:10, title:'Foreign Exchange & Balance of Payments', desc:'Exchange rates, balance of payments, currency markets, and international capital flows.'},
      {id:11, title:'Economic Growth, Development & Labour', desc:'Growth sources, development indicators, labor markets, and human capital theory.'},
      {id:12, title:'Sri Lankan Economy Post-Independence', desc:'Evolution of Sri Lanka\'s economy from independence to present — policy shifts and challenges.'}
    ]
  },
  {
    id: 'business',
    name: 'Business Studies',
    accent: 'amber',
    lessons: [
      {id:1, title:'Basis of Business & Environment', desc:'Business definition, types of activity, objectives, stakeholders, and PEST factors.'},
      {id:2, title:'Social Responsibility & Business Ethics', desc:'CSR, ethical vs legal, stakeholder impact, triple bottom line, and ethical trading.'},
      {id:3, title:'Business-Government Relations & Consumer Protection', desc:'Business-government relations, regulations, consumer rights, and protection mechanisms.'},
      {id:4, title:'Business Organizations', desc:'Sole proprietorships, partnerships, corporations, cooperatives, and their characteristics.'},
      {id:5, title:'Entrepreneurship', desc:'Entrepreneurial process, innovation, business planning, venture creation, and economic role.'},
      {id:6, title:'Money and Financial Institutions', desc:'Nature of money, financial systems, banking institutions, and monetary policy fundamentals.'},
      {id:7, title:'Insurance', desc:'Insurance principles, policy types, risk management, and the insurance industry\'s role.'},
      {id:8, title:'Communication', desc:'Business communication methods, written and oral, technology, and presentation skills.'}
    ]
  },
  {
    id: 'ict',
    name: 'ICT',
    accent: 'purple',
    lessons: [
      {id:1, title:'Data Representation', desc:'Binary, hexadecimal, number systems, and how data is represented in computer systems.'},
      {id:2, title:'Data Transmission', desc:'Methods of data transmission, protocols, error detection, and network communication basics.'},
      {id:3, title:'Hardware', desc:'Computer hardware components, peripherals, and the internal architecture of computing systems.'},
      {id:4, title:'Software', desc:'Operating systems, application software, utilities, and the role of software in computing.'},
      {id:5, title:'Networks', desc:'Network topologies, types (LAN/WAN), IP addressing, and the fundamentals of computer networking.'},
      {id:6, title:'Security and Ethics', desc:'Cybersecurity threats, encryption, authentication, and ethical considerations in ICT.'},
      {id:7, title:'Databases', desc:'Relational databases, SQL, data modeling, and the principles of data management.'},
      {id:8, title:'Algorithms and Pseudocode', desc:'Algorithm design, flowcharts, pseudocode, sorting and searching algorithms.'},
      {id:9, title:'Programming Concepts', desc:'Variables, data types, operators, and the fundamentals of programming logic and structures.'},
      {id:10, title:'Python — Basics', desc:'Python syntax, variables, data types, input/output, conditionals, and loops.'},
      {id:11, title:'Python — Functions and Files', desc:'Functions, parameters, return values, file handling, modules, and code organization in Python.'},
      {id:12, title:'Web Technologies', desc:'HTML, CSS, JavaScript fundamentals, web architecture, and how the internet works.'}
    ]
  }
];

export const BOOKS_DATA = [
  {id:"01", title:"The 48 Laws of Power", author:"Robert Greene", desc:"The essential guide to the mechanics of power — how to acquire it, defend it, and wield it without falling victim to those who play the game better than you.", filter:"power"},
  {id:"02", title:"Atomic Habits", author:"James Clear", desc:"Tiny changes, remarkable results. The science of building good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable outcomes.", filter:"productivity"},
  {id:"03", title:"Building a Second Brain", author:"Tiago Forte", desc:"A proven method to organize your digital life and unlock your creative potential using the CODE framework and PARA system.", filter:"productivity"},
  {id:"04", title:"Deep Work", author:"Cal Newport", desc:"Rules for focused success in a distracted world. Why deep concentration is becoming the superpower of the 21st century.", filter:"productivity"},
  {id:"05", title:"Ego Is the Enemy", author:"Ryan Holiday", desc:"The battle against ego — in ambition, success, and failure. Why humility is the ultimate strategy and ego the greatest obstacle.", filter:"philosophy"},
  {id:"06", title:"Hyperfocus", author:"Chris Bailey", desc:"How to manage your attention in a world of distraction and be more productive by understanding the two modes of focus.", filter:"productivity"},
  {id:"07", title:"Money Unlocked", author:"John Lee", desc:"Break free from limiting beliefs about money and unlock your financial potential through mindset shifts and practical strategies.", filter:"finance"},
  {id:"08", title:"The Power of Now", author:"Eckhart Tolle", desc:"The ultimate guide to spiritual enlightenment through living in the present moment and freeing yourself from pain and suffering.", filter:"philosophy"},
  {id:"09", title:"Psycho-Cybernetics", author:"Maxwell Maltz", desc:"Your self-image determines your success. The classic guide to rewiring your brain for achievement through cybernetic principles.", filter:"psychology"},
  {id:"10", title:"The Changing World Order", author:"Ray Dalio", desc:"Why nations succeed and fail — the big cycles in history that explain the past, present, and future of global power.", filter:"finance"},
  {id:"11", title:"What Every BODY Is Saying", author:"Joe Navarro", desc:"An ex-FBI agent's guide to speed-reading people through nonverbal communication and understanding the hidden messages in body language.", filter:"psychology"},
  {id:"12", title:"Book of Wisdom", author:"Harry B. Joseph", desc:"A revival of ancient wisdom for modern living — timeless philosophical insights and practical principles for navigating life with clarity, purpose, and understanding.", filter:"philosophy"},
  {id:"13", title:"Daily Robert Greene", author:"Robert Greene", desc:"366 meditations on power, seduction, mastery, strategy, and human nature — a year of daily wisdom drawn from Greene's life's work.", filter:"power"},
  {id:"14", title:"Mastery", author:"Robert Greene", desc:"The lifelong journey of mastering a craft — following your passion, undergoing apprenticeship, and achieving creative excellence through deliberate practice and perseverance.", filter:"productivity"},
  {id:"15", title:"Read People Like a Book", author:"Patrick King", desc:"How to analyze, understand, and predict people's emotions, thoughts, intentions, and behaviors — decoding the hidden meanings behind what people say and do.", filter:"psychology"},
  {id:"16", title:"Rich Dad Poor Dad", author:"Robert Kiyosaki", desc:"What the rich teach their kids about money that the poor and middle class do not — the timeless lessons of financial literacy, assets vs liabilities, and escaping the rat race.", filter:"finance"},
  {id:"17", title:"Surrounded by Idiots", author:"Thomas Erikson", desc:"The four types of human behavior and how to effectively communicate with each in business and in life using the DISC personality framework.", filter:"psychology"},
  {id:"18", title:"Surrounded By Psychopaths", author:"Thomas Erikson", desc:"How to identify, understand, and protect yourself from psychopathic behavior using the DISC model and recognizing the dark triad of personality traits.", filter:"psychology"},
  {id:"19", title:"The Art of Seduction", author:"Robert Greene", desc:"The 9 types of seducers and the timeless strategies of attraction — mastering the seductive process through psychological insight and social intelligence.", filter:"power"},
  {id:"20", title:"The Concise Laws of Human Nature", author:"Robert Greene", desc:"A condensed guide to the 18 laws of human nature — understanding why people behave the way they do and mastering the dynamics of social behavior.", filter:"psychology"},
  {id:"21", title:"The Laws of Human Nature", author:"Robert Greene", desc:"The definitive guide to understanding human behavior — 18 deep psychological laws with historical examples and strategies for mastering social dynamics.", filter:"psychology"},
  {id:"22", title:"The Millionaire Master Plan", author:"Roger James Hamilton", desc:"Your personalized path to financial success — discovering your wealth personality type and following a tailored plan to build lasting prosperity.", filter:"finance"},
  {id:"23", title:"The Prince", author:"Niccolò Machiavelli", desc:"The classic Renaissance treatise on power, leadership, and statecraft — the timeless principles of how a ruler should acquire, maintain, and wield power.", filter:"power"},
  {id:"24", title:"The Psychology of Money", author:"Morgan Housel", desc:"Timeless lessons on wealth, greed, and happiness — how our emotional and psychological relationship with money shapes our financial decisions more than math ever does.", filter:"finance"}
];

export const BADGES_DEF = [
  { id:'first-lesson', name:'First Steps', desc:'Complete your first lesson', icon:'🏁' },
  { id:'quick-learner', name:'Quick Learner', desc:'Complete 5 lessons', icon:'📚' },
  { id:'scholar', name:'Scholar', desc:'Complete 10 lessons', icon:'🎓' },
  { id:'subject-master', name:'Subject Master', desc:'Complete all lessons in a subject', icon:'👑' },
  { id:'quiz-ace', name:'Quiz Ace', desc:'Get 100% on any quiz', icon:'✅' },
  { id:'quiz-legend', name:'Quiz Legend', desc:'Get 100% on 3 quizzes', icon:'🏆' },
  { id:'streak-3', name:'Streak Starter', desc:'3-day streak', icon:'🔥' },
  { id:'streak-7', name:'Streak Warrior', desc:'7-day streak', icon:'⚡' },
  { id:'streak-30', name:'Streak Legend', desc:'30-day streak', icon:'💫' },
  { id:'flashcard-fanatic', name:'Flashcard Fanatic', desc:'Review 20 flashcards', icon:'🃏' },
  { id:'dedicated', name:'Dedicated', desc:'Complete 20 lessons', icon:'💎' },
  { id:'all-rounder', name:'All-Rounder', desc:'Study every subject', icon:'🌐' }
];

export const QUIZ_DATA = {
  economics: {
    1: [
      {q:'What is the fundamental economic problem faced by all societies?', options:['Scarcity','Inflation','Unemployment','Taxation'], answer:0, explain:'Scarcity — unlimited wants vs limited resources — is the basic economic problem.'},
      {q:'What does opportunity cost refer to?', options:['Money spent on a purchase','The next best alternative forgone','Total cost of production','The price of a good'], answer:1, explain:'Opportunity cost is the value of the next best alternative given up when making a choice.'},
      {q:'Which of the following is NOT a factor of production?', options:['Land','Labour','Money','Entrepreneurship'], answer:2, explain:'The four factors of production are land, labour, capital, and entrepreneurship. Money is not a factor — it is a medium of exchange.'},
      {q:'In a market economy, resource allocation is primarily determined by:', options:['Government planning','Price mechanism / market forces','Traditional customs','Central authority'], answer:1, explain:'Market economies rely on the price mechanism — supply and demand — to allocate resources.'},
      {q:'A point inside the Production Possibility Curve (PPC) indicates:', options:['Efficient production','Unattainable production','Underutilization of resources','Economic growth'], answer:2, explain:'Points inside the PPC show that resources are not being fully or efficiently utilized.'},
      {q:'Which economic system answers the three basic questions through customs and traditions?', options:['Market economy','Command economy','Mixed economy','Traditional economy'], answer:3, explain:'Traditional economies rely on customs, beliefs, and habits passed down through generations.'},
      {q:'"Needs" refer to:', options:['Luxury items','Items essential for survival','Goods that are on sale','Non-essential services'], answer:1, explain:'Needs are basic requirements for survival (food, water, shelter), while wants are non-essential desires.'},
      {q:'What does a rightward shift of the PPC represent?', options:['Economic decline','Economic growth','Resource underutilization','Increase in unemployment'], answer:1, explain:'An outward (rightward) shift of the PPC indicates economic growth — an increase in the economy\'s productive capacity.'}
    ],
    2: [
      {q:'The law of demand states that as price increases, quantity demanded:', options:['Increases','Decreases','Stays constant','Fluctuates randomly'], answer:1, explain:'The law of demand: price and quantity demanded are inversely related — higher price leads to lower quantity demanded.'},
      {q:'Which of the following would shift the demand curve for a good to the right?', options:['A decrease in consumer income (normal good)','An increase in the price of a substitute','A decrease in population','An increase in the price of the good itself'], answer:1, explain:'If the price of a substitute rises, consumers switch to this good, increasing demand (rightward shift).'},
      {q:'Market equilibrium occurs when:', options:['Quantity demanded equals quantity supplied','Price is at its maximum','Supply exceeds demand','Government sets the price'], answer:0, explain:'Equilibrium is the point where the quantity consumers want to buy equals the quantity producers want to sell.'},
      {q:'A surplus in a market occurs when:', options:['Price is below equilibrium','Price is above equilibrium','Demand increases','Supply decreases'], answer:1, explain:'When price is above equilibrium, quantity supplied exceeds quantity demanded, creating a surplus.'},
      {q:'Which factor would shift the supply curve to the left?', options:['Technological advancement','A decrease in production costs','An increase in the number of suppliers','An increase in the cost of raw materials'], answer:3, explain:'Higher input costs (raw materials) make production more expensive, reducing supply (leftward shift).'},
      {q:'A price ceiling set below equilibrium will cause:', options:['A surplus','A shortage','No change','Increased supply'], answer:1, explain:'A binding price ceiling (below equilibrium) keeps price artificially low, causing quantity demanded to exceed quantity supplied — a shortage.'},
      {q:'If a good has a price elasticity of demand of 0.3, demand is:', options:['Perfectly elastic','Elastic','Unit elastic','Inelastic'], answer:3, explain:'A PED of 0.3 (less than 1) means demand is inelastic — quantity changes proportionally less than price.'},
      {q:'Cross-price elasticity of demand between two substitutes will be:', options:['Negative','Zero','Positive','Infinite'], answer:2, explain:'For substitutes, a price rise in one good increases demand for the other, giving a positive cross-price elasticity.'}
    ],
    3: [
      {q:'Which of the following is an example of government intervention in a market?', options:['Laissez-faire policy','Price ceiling','Perfect competition','Consumer sovereignty'], answer:1, explain:'A price ceiling (maximum price) is a direct government intervention to control prices, typically set below equilibrium to make goods affordable.'},
      {q:'An indirect tax causes the supply curve to shift:', options:['Rightward','Leftward','Downward','No shift'], answer:1, explain:'Indirect taxes (e.g., VAT) increase production costs, shifting the supply curve leftward (upward).'},
      {q:'A subsidy to producers will:', options:['Increase supply and lower price','Decrease supply and raise price','Have no effect on price','Increase demand'], answer:0, explain:'Subsidies reduce production costs, shifting supply rightward — increasing quantity and lowering the equilibrium price.'},
      {q:'A price floor set above the equilibrium price causes:', options:['A shortage','A surplus','No change','Increased demand'], answer:1, explain:'A binding price floor (above equilibrium) keeps price artificially high, creating a surplus as quantity supplied exceeds quantity demanded.'},
      {q:'Which is NOT a reason for government intervention in markets?', options:['To correct externalities','To provide public goods','To maximize firm profits','To promote equity'], answer:2, explain:'Governments intervene to correct market failures and promote social welfare — maximizing firm profits is a private, not government, objective.'},
      {q:'What is a buffer stock scheme?', options:['A tax on imported goods','A system to stabilize prices by buying/selling stock','A price ceiling on essential goods','A government subsidy to farmers'], answer:1, explain:'Buffer stock schemes involve buying excess supply (to raise prices) and releasing stock (to lower prices), stabilizing market prices for commodities.'},
      {q:'Government failure occurs when:', options:['Markets allocate resources efficiently','Intervention leads to net welfare loss','Private firms maximize profits','Consumers have perfect information'], answer:1, explain:'Government failure happens when intervention creates more inefficiency than the market failure it was meant to correct.'},
      {q:'Which market failure does government address by providing public goods?', options:['Information asymmetry','Non-excludability and non-rivalry','Monopoly power','Factor immobility'], answer:1, explain:'Public goods are non-excludable and non-rival — the private market under-provides them, so government steps in (e.g., defense, street lighting).'}
    ],
    4: [
      {q:'In the short run, at least one factor of production is:', options:['Variable','Fixed','Zero','Perfectly elastic'], answer:1, explain:'The short run is defined as a period where at least one factor of production is fixed (typically capital).'},
      {q:'The law of diminishing returns states that adding more of a variable factor to a fixed factor will eventually:', options:['Increase total output at an increasing rate','Decrease total output','Increase output at a decreasing rate','Have no effect'], answer:2, explain:'Diminishing returns: after a certain point, each additional unit of variable input yields smaller increases in output.'},
      {q:'Average total cost (ATC) equals:', options:['Fixed cost divided by quantity','Total cost divided by quantity','Variable cost plus fixed cost','Marginal cost times quantity'], answer:1, explain:'ATC = Total Cost ÷ Quantity. It includes both average fixed and average variable costs.'},
      {q:'Economies of scale occur when:', options:['Average cost falls as output increases','Marginal cost rises','Fixed costs become zero','Variable costs double'], answer:0, explain:'Economies of scale refer to the cost advantage — falling average cost — as a firm increases its scale of production.'},
      {q:'In perfect competition, firms are:', options:['Price makers','Price takers','Price setters','Price regulators'], answer:1, explain:'Perfectly competitive firms are price takers — they must accept the market price because no single firm can influence it.'},
      {q:'A monopoly is characterized by:', options:['Many firms selling identical products','A single seller with high barriers to entry','Free entry and exit','Product differentiation'], answer:1, explain:'A monopoly has one dominant firm, high barriers to entry (legal, natural, or technological), and significant market power.'},
      {q:'Product differentiation is a key feature of:', options:['Perfect competition','Monopoly','Monopolistic competition','Oligopoly'], answer:2, explain:'Monopolistic competition features many firms selling differentiated products (e.g., restaurants, clothing brands).'},
      {q:'An oligopoly is characterized by:', options:['A single firm','Many small firms','A few large interdependent firms','No barriers to entry'], answer:2, explain:'Oligopoly has a few large firms whose decisions are interdependent — each firm\'s pricing/output affects the others (game theory applies).'}
    ],
    5: [
      {q:'Gross Domestic Product (GDP) measures:', options:['Total wealth of a country','Total value of final goods/services produced domestically','Total income of citizens abroad','Government revenue'], answer:1, explain:'GDP is the total market value of all final goods and services produced within a country\'s borders in a given period.'},
      {q:'GDP differs from GNP because GNP includes:', options:['Only domestic production','Production by citizens abroad','Only government spending','Exports minus imports'], answer:1, explain:'GNP = GDP + net income from abroad (income earned by residents from foreign investments minus foreign earnings sent out).'},
      {q:'Which approach calculates GDP by summing spending on consumption, investment, government, and net exports?', options:['Income approach','Output approach','Expenditure approach','Value-added approach'], answer:2, explain:'The expenditure approach: GDP = C + I + G + (X-M).'},
      {q:'Which of the following is counted in GDP?', options:['A used car sale','Intermediate goods','Government salaries','Stock market trading'], answer:2, explain:'Government salaries are part of G (government spending). Used goods and intermediate goods are excluded to avoid double-counting.'},
      {q:'Nominal GDP differs from Real GDP because Real GDP:', options:['Includes imports','Adjusts for inflation','Uses current year prices','Excludes services'], answer:1, explain:'Real GDP adjusts for inflation by using base-year prices, measuring actual output changes rather than price changes.'},
      {q:'The underground economy is:', options:['Always included in GDP','Not captured in official GDP figures','Part of government spending','Equal to black market only'], answer:1, explain:'The underground (shadow) economy includes unreported economic activity, making official GDP an underestimate.'},
      {q:'GDP per capita is calculated by:', options:['GDP divided by total land area','GDP divided by population','Total exports divided by GDP','Government spending divided by population'], answer:1, explain:'GDP per capita = GDP ÷ Population. It gives average output per person and is a rough measure of living standards.'},
      {q:'A limitation of GDP as a welfare measure is that it:', options:['Overestimates inflation','Ignores non-market activities and income distribution','Excludes government services','Only measures industrial output'], answer:1, explain:'GDP does not account for unpaid work, environmental degradation, leisure time, or how income is distributed among citizens.'}
    ],
    6: [
      {q:'Aggregate demand (AD) consists of:', options:['C + I + G + (X-M)','C + S + T','GDP - depreciation','Government spending only'], answer:0, explain:'AD = Consumption + Investment + Government Spending + Net Exports.'},
      {q:'The downward slope of the AD curve is explained by:', options:['Law of diminishing returns','Wealth effect, interest rate effect, exchange rate effect','Substitution effect','Income effect'], answer:1, explain:'The AD curve slopes downward due to: wealth effect (lower prices increase real wealth), interest rate effect, and exchange rate effect.'},
      {q:'The business cycle consists of:', options:['Inflation and deflation','Boom, recession, trough, recovery','Supply and demand','Exports and imports'], answer:1, explain:'The business cycle: expansion (boom) → peak → contraction (recession) → trough → recovery.'},
      {q:'During a recession, which policy would a government most likely use?', options:['Contractionary fiscal policy','Expansionary fiscal policy','Increasing taxes','Reducing money supply'], answer:1, explain:'Expansionary fiscal policy (increased spending, tax cuts) stimulates aggregate demand during recessions.'},
      {q:'Frictional unemployment occurs when:', options:['Workers lack required skills','Workers are between jobs or entering the workforce','The economy is in recession','Technology replaces jobs'], answer:1, explain:'Frictional unemployment is short-term unemployment from workers moving between jobs or entering the labor market for the first time.'},
      {q:'The natural rate of unemployment includes:', options:['Only cyclical unemployment','Frictional and structural unemployment','All types of unemployment','Only seasonal unemployment'], answer:1, explain:'The natural rate = frictional + structural unemployment. Cyclical unemployment is temporary and related to the business cycle.'},
      {q:'Stagflation refers to:', options:['High growth with low inflation','High inflation with high unemployment','Low inflation with low unemployment','Deflation with high growth'], answer:1, explain:'Stagflation is an unusual combination of high inflation, high unemployment, and stagnant demand — seen in the 1970s oil crises.'},
      {q:'The multiplier effect means:', options:['An initial change in spending leads to a larger final change in GDP','Taxes multiply automatically','Investment equals savings','Prices multiply with output'], answer:0, explain:'The multiplier: an initial injection (investment, govt spending) leads to increased income, which leads to more spending, amplifying the total impact on GDP.'}
    ],
    7: [
      {q:'The Consumer Price Index (CPI) measures:', options:['Price changes of all goods in the economy','Price changes of a representative basket of consumer goods','Wholesale price changes','Changes in GDP'], answer:1, explain:'CPI tracks the average change in prices paid by consumers for a fixed basket of goods and services over time.'},
      {q:'If the CPI rises from 120 to 132, the inflation rate is:', options:['10%','12%','20%','8%'], answer:0, explain:'Inflation rate = ((132-120)/120) × 100 = 10%.'},
      {q:'Demand-pull inflation is caused by:', options:['Rising production costs','Excess aggregate demand','Decreased money supply','Falling wages'], answer:1, explain:'Demand-pull inflation occurs when aggregate demand exceeds the economy\'s productive capacity, pulling prices upward.'},
      {q:'Cost-push inflation is caused by:', options:['Excess demand','Rising costs of production (e.g., oil, wages)','Increased productivity','Lower taxes'], answer:1, explain:'Cost-push inflation results from increased production costs (raw materials, wages) reducing aggregate supply and raising prices.'},
      {q:'The three functions of money are:', options:['Medium of exchange, store of value, unit of account','Buying, selling, trading','Earning, spending, saving','Production, distribution, consumption'], answer:0, explain:'Money serves as: 1) medium of exchange, 2) store of value, and 3) unit of account.'},
      {q:'A central bank controls inflation primarily through:', options:['Fiscal policy','Monetary policy','Trade policy','Industrial policy'], answer:1, explain:'Central banks use monetary policy (interest rates, reserve requirements, open market operations) to manage inflation and money supply.'},
      {q:'Open Market Operations involve:', options:['Government setting price controls','Central bank buying/selling government securities','Tax collection by the treasury','Foreign exchange intervention'], answer:1, explain:'Open Market Operations (OMOs) are the central bank\'s purchase or sale of government bonds to expand or contract the money supply.'},
      {q:'Commercial banks create credit through:', options:['Printing money','The fractional reserve banking system','Government authorization','Selling shares'], answer:1, explain:'Banks lend out most deposits while keeping a fraction as reserves — this process of lending and re-lending creates new credit/money in the economy.'}
    ],
    8: [
      {q:'A negative externality occurs when:', options:['A third party benefits from a transaction','A third party bears costs from a production/consumption activity','The government regulates prices','Consumers have perfect information'], answer:1, explain:'Negative externalities impose costs on third parties (e.g., pollution from a factory affecting nearby residents).'},
      {q:'Which is an example of a positive externality?', options:['Air pollution from a factory','A neighbor\'s beautiful garden increasing property values','Traffic congestion','Noise from construction'], answer:1, explain:'Positive externalities benefit third parties — a well-maintained garden raises neighborhood property values for everyone.'},
      {q:'A public good has the characteristics of being:', options:['Rival and excludable','Non-rival and non-excludable','Rival and non-excludable','Non-rival and excludable'], answer:1, explain:'Public goods are non-rival (one person\'s use does not reduce availability) and non-excludable (cannot prevent anyone from using them).'},
      {q:'The free rider problem occurs with:', options:['Private goods','Public goods','Inferior goods','Luxury goods'], answer:1, explain:'People can benefit from public goods without paying (free riding), leading to under-provision by the private market.'},
      {q:'A progressive tax means:', options:['The tax rate increases as income rises','Everyone pays the same rate','The tax rate decreases as income rises','Only the wealthy pay tax'], answer:0, explain:'Progressive taxation: higher-income earners pay a larger percentage of their income in tax (e.g., income tax brackets).'},
      {q:'Fiscal policy involves changes in:', options:['Interest rates and money supply','Government spending and taxation','Exchange rates','Import quotas'], answer:1, explain:'Fiscal policy is the use of government spending and taxation to influence the economy.'},
      {q:'An expansionary fiscal policy during a recession includes:', options:['Increasing taxes and reducing spending','Decreasing taxes and increasing spending','Raising interest rates','Reducing money supply'], answer:1, explain:'Expansionary fiscal policy = tax cuts + increased government spending to boost aggregate demand.'},
      {q:'Government budget deficit occurs when:', options:['Tax revenue exceeds spending','Government spending exceeds tax revenue','Exports exceed imports','Money supply decreases'], answer:1, explain:'A budget deficit = government spending > tax revenue. It is often financed by borrowing (issuing government bonds).'}
    ],
    9: [
      {q:'A tariff is a:', options:['Quantitative restriction on imports','Tax on imported goods','Subsidy to domestic producers','Ban on trade'], answer:1, explain:'A tariff is a tax imposed on imported goods, raising their price and protecting domestic industries.'},
      {q:'A quota is a:', options:['Tax on imports','Limit on the quantity of a good that can be imported','Subsidy to exporters','Government payment to domestic firms'], answer:1, explain:'A quota sets a physical limit on the quantity or value of a good that can be imported during a period.'},
      {q:'Which is NOT an argument for protectionism?', options:['Protecting infant industries','National security','Lower prices for consumers','Preventing dumping'], answer:2, explain:'Protectionism typically raises consumer prices. The other three are standard arguments: protecting infant industries, national security, and anti-dumping.'},
      {q:'Dumping occurs when:', options:['A country exports more than it imports','A firm sells goods abroad below production cost','Goods are disposed of improperly','A government subsidizes exports'], answer:1, explain:'Dumping = exporting goods at a price below their cost of production or below the domestic price, often to capture market share.'},
      {q:'Foreign Direct Investment (FDI) involves:', options:['Purchasing foreign stocks','Establishing productive operations in another country','Short-term capital flows','Importing foreign goods'], answer:1, explain:'FDI is a long-term investment where a firm establishes physical operations (factory, office) in a foreign country.'},
      {q:'A Multinational Corporation (MNC) is a firm that:', options:['Operates only in its home country','Has operations in multiple countries through subsidiaries','Only exports goods','Is owned by the government'], answer:1, explain:'MNCs operate in multiple countries, managing production or delivering services in more than one nation.'},
      {q:'Which is a potential benefit of FDI for host countries?', options:['Loss of sovereignty','Technology transfer and job creation','Exploitation of workers','Environmental degradation'], answer:1, explain:'FDI can bring capital, technology, management skills, and employment to the host country.'},
      {q:'The World Trade Organization (WTO) primarily aims to:', options:['Provide development aid','Promote free trade and resolve trade disputes','Set global interest rates','Regulate currency exchange'], answer:1, explain:'The WTO facilitates trade negotiations, sets trade rules, and provides a dispute resolution mechanism between member nations.'}
    ],
    10: [
      {q:'The exchange rate is:', options:['The interest rate set by the central bank','The price of one currency in terms of another','The inflation rate difference between countries','GDP divided by exports'], answer:1, explain:'The exchange rate is the value of one currency expressed in units of another currency (e.g., 1 USD = 300 LKR).'},
      {q:'Under a floating exchange rate system, the rate is determined by:', options:['Government decree','Supply and demand in foreign exchange markets','The IMF','A fixed formula based on gold'], answer:1, explain:'In a floating system, market forces of supply and demand determine the exchange rate.'},
      {q:'An appreciation of the domestic currency makes exports:', options:['Cheaper for foreign buyers','More expensive for foreign buyers','Unaffected','Prohibited'], answer:1, explain:'Appreciation makes domestic goods pricier abroad (exports fall) and foreign goods cheaper domestically (imports rise).'},
      {q:'The Balance of Payments records:', options:['Only trade in goods','All economic transactions between residents and the rest of the world','Only capital flows','Government budget transactions'], answer:1, explain:'The BoP systematically records all economic transactions between a country\'s residents and the rest of the world.'},
      {q:'The Current Account includes:', options:['Trade in goods and services, income, and transfers','Foreign direct investment','Portfolio investment','Central bank reserves'], answer:0, explain:'The Current Account covers: visible trade (goods), invisible trade (services), income flows, and current transfers.'},
      {q:'If a country imports more than it exports, it has a:', options:['Current account surplus','Current account deficit','Capital account surplus','Trade surplus'], answer:1, explain:'A current account deficit means imports of goods/services exceed exports — the country is a net borrower from the rest of the world.'},
      {q:'The Capital and Financial Account records:', options:['Trade in services','Flows of financial assets and investments','Government salaries','Consumer spending'], answer:1, explain:'This account records capital transfers and the purchase/sale of financial assets (FDI, portfolio investment, loans).'},
      {q:'A depreciation of the currency can correct a trade deficit by:', options:['Making exports cheaper and imports dearer','Reducing domestic production','Increasing foreign investment','Lowering interest rates'], answer:0, explain:'Depreciation improves the trade balance: exports become cheaper (more competitive) while imports become more expensive, reducing demand for imports.'}
    ],
    11: [
      {q:'Economic growth is best measured by:', options:['Increase in population','Increase in real GDP over time','Decrease in unemployment','Rise in government spending'], answer:1, explain:'Economic growth refers to a sustained increase in a country\'s real GDP (or real GDP per capita) over time.'},
      {q:'The three main sources of economic growth are:', options:['Land, labor, and capital','Natural resources, technology, and population','Factor accumulation, productivity, and technological progress','Trade, aid, and investment'], answer:2, explain:'Growth comes from: 1) increased factor inputs, 2) improved productivity, and 3) technological innovation.'},
      {q:'Human capital refers to:', options:['Physical machinery and equipment','The knowledge, skills, and health of the workforce','Financial assets owned by individuals','Natural resource endowments'], answer:1, explain:'Human capital is the stock of knowledge, habits, social and personality attributes embodied in the ability to perform labor.'},
      {q:'The Human Development Index (HDI) combines:', options:['GDP, inflation, and unemployment','Income, education, and health indicators','Exports, imports, and exchange rates','Population, land area, and resources'], answer:1, explain:'HDI = Life expectancy (health) + Expected years of schooling (education) + GNI per capita (income).'},
      {q:'Labor productivity is defined as:', options:['Total number of workers','Output per worker per unit of time','Total wages paid','Number of hours worked'], answer:1, explain:'Labor productivity = total output ÷ total labor input (number of workers or hours). Higher productivity drives economic growth.'},
      {q:'Structural unemployment occurs when:', options:['Workers are between jobs','There is a mismatch between workers\' skills and available jobs','The economy is in a recession','Workers refuse to work at prevailing wages'], answer:1, explain:'Structural unemployment arises from changes in the economy (technology, industry decline) that create a gap between available jobs and worker skills.'},
      {q:'The labor force participation rate measures:', options:['The unemployment rate','The percentage of working-age population in the labor force','Total employment','The number of people not in education'], answer:1, explain:'Labor force participation rate = (Labor Force ÷ Working-Age Population) × 100. It shows the active portion of the potential workforce.'},
      {q:'Sustainable development aims to:', options:['Maximize current GDP growth','Meet present needs without compromising future generations','Reduce all economic activity','Achieve zero unemployment'], answer:1, explain:'Sustainable development balances economic growth with environmental protection and social equity for long-term well-being.'}
    ],
    12: [
      {q:'At independence in 1948, Sri Lanka\'s economy was primarily:', options:['Industrial','Agricultural with plantation crops (tea, rubber, coconut)','Technology-based','Oil-exporting'], answer:1, explain:'The colonial economy was dominated by plantation agriculture — tea, rubber, and coconut — which continued after independence.'},
      {q:'The 1977 economic reforms shifted Sri Lanka from:', options:['A market economy to a command economy','Import substitution to export-oriented liberalization','Agriculture to industry','Socialism to communism'], answer:1, explain:'The 1977 UNP government shifted from protectionist import-substitution to an open, export-oriented economy with trade liberalization.'},
      {q:'Which of the following was part of the 1977 liberalization?', options:['Nationalizing plantations','Removing price controls and opening to foreign investment','Introducing central planning','Closing the stock exchange'], answer:1, explain:'Reforms included: removing price controls, liberalizing trade, opening to FDI, floating the rupee, and promoting export processing zones.'},
      {q:'The civil war (1983-2009) affected the economy by:', options:['Boosting tourism','Reducing FDI and diverting resources to military spending','Increasing agricultural exports','Lowering government debt'], answer:1, explain:'The conflict reduced foreign investment, damaged infrastructure, diverted government spending to defense, and disrupted economic activity in the north/east.'},
      {q:'Sri Lanka\'s major export earner after independence shifted from coffee to:', options:['Rubber','Tea','Textiles','Coconut'], answer:1, explain:'Coffee cultivation collapsed due to disease in the 1870s and was replaced by tea, which became Sri Lanka\'s dominant plantation export.'},
      {q:'The Mahaweli Development Programme aimed to:', options:['Build highways','Develop irrigation and hydropower through river diversion','Establish industrial zones','Promote tourism'], answer:1, explain:'The Mahaweli Programme (1970s onward) was Sri Lanka\'s largest development project, diverting the Mahaweli River for irrigation and hydroelectricity.'},
      {q:'In recent years, Sri Lanka\'s economy has faced challenges from:', options:['Oil abundance','High debt levels, fiscal deficits, and external imbalances','Trade surpluses','Rapid industrialization'], answer:1, explain:'Sri Lanka has faced chronic fiscal deficits, high public debt, low foreign reserves, and balance of payments pressures — culminating in the 2022 economic crisis.'},
      {q:'The 2022 economic crisis in Sri Lanka was triggered by:', options:['Oil price collapse','Foreign exchange shortages, debt distress, and policy missteps','Agricultural boom','Stock market crash'], answer:1, explain:'The crisis resulted from depleted foreign reserves, inability to pay import bills (fuel, food, medicine), unsustainable debt, and tourism collapse from COVID-19.'}
    ]
  },
  business: {
    1: [
      {q:'What is the primary purpose of a business?', options:['To provide employment','To maximize shareholder wealth','To produce goods and services to satisfy needs','To pay taxes'], answer:2, explain:'The core purpose of a business is to produce goods and services that satisfy human needs and wants.'},
      {q:'Which of the following is a stakeholder of a business?', options:['Only shareholders','Only employees','Only customers','All of the above'], answer:3, explain:'Stakeholders include shareholders, employees, customers, suppliers, the government, and the community.'},
      {q:'What is CSR (Corporate Social Responsibility)?', options:['Maximizing profits at all costs','Business obligations to society beyond legal requirements','Strictly following the law','Reducing employee wages'], answer:1, explain:'CSR refers to a business\'s voluntary commitment to act ethically and contribute to society beyond legal obligations.'},
      {q:'What does the PEST analysis examine?', options:['Product, price, place, promotion','Political, Economic, Social, Technological factors','Profit, equity, sales, tax','People, environment, strategy, time'], answer:1, explain:'PEST analysis examines the external macro-environment: Political, Economic, Social, and Technological factors affecting a business.'},
      {q:'A sole trader business structure is characterized by:', options:['Shared ownership among many partners','Single owner with unlimited liability','Separate legal entity','Ownership through shares'], answer:1, explain:'A sole trader has one owner who bears unlimited liability for the business\'s debts.'},
      {q:'The secondary sector of industry involves:', options:['Extraction of raw materials','Manufacturing and construction','Retail and services','Research and development'], answer:1, explain:'The secondary sector transforms raw materials into finished goods through manufacturing and construction.'},
      {q:'Which business objective focuses on minimizing harm to the environment?', options:['Profit maximization','Market share growth','Sustainability','Employee satisfaction'], answer:2, explain:'Sustainability as a business objective involves operating in a way that minimizes environmental harm and preserves resources for future generations.'},
      {q:'Opportunity cost for a business is:', options:['The monetary cost of production','The benefit given up from the next best alternative','The total revenue minus costs','The price set for a product'], answer:1, explain:'For businesses, opportunity cost is the potential benefit lost when choosing one alternative over the next best option.'}
    ],
    2: [
      {q:'What is Corporate Social Responsibility (CSR)?', options:['A legal requirement for all businesses','The voluntary integration of social and environmental concerns in business operations','A marketing strategy to increase prices','A government regulation on wages'], answer:1, explain:'CSR is the voluntary commitment by businesses to operate ethically and consider their social and environmental impact.'},
      {q:'Ethical behavior in business means:', options:['Following only what is profitable','Doing what is legally required','Doing what is morally right beyond legal obligations','Following competitor actions'], answer:2, explain:'Business ethics involves doing what is morally right, even when not legally required.'},
      {q:'The triple bottom line framework considers:', options:['Profit, products, and people','Profit, planet, and people','Price, product, and promotion','Production, profit, and planning'], answer:1, explain:'The triple bottom line — People, Planet, Profit — measures a business\'s social, environmental, and financial performance.'},
      {q:'Which is an example of ethical trading?', options:['Paying below minimum wage','Using child labor','Ensuring fair wages and safe working conditions in the supply chain','Ignoring environmental regulations'], answer:2, explain:'Ethical trading involves ensuring fair wages, safe conditions, and human rights throughout the supply chain.'},
      {q:'A business that pollutes a river but stays within legal limits is:', options:['Acting ethically','Acting legally but not necessarily ethically','Fully responsible under CSR','Meeting triple bottom line standards'], answer:1, explain:'Legal compliance does not equal ethical behavior. CSR goes beyond the law to consider wider impacts.'},
      {q:'Which stakeholder is most directly affected by a business\'s decision to relocate abroad?', options:['Government','Local employees','Customers','Competitors'], answer:1, explain:'Local employees are directly affected by relocation — they may lose jobs or face pressure to relocate.'},
      {q:'Ethical sourcing of materials means:', options:['Buying the cheapest materials','Sourcing from suppliers who follow ethical labor and environmental practices','Sourcing only from local suppliers','Using synthetic materials only'], answer:1, explain:'Ethical sourcing involves selecting suppliers that adhere to fair labor practices and environmental standards.'},
      {q:'A business engaging in greenwashing is:', options:['Actually reducing its environmental footprint','Making misleading claims about its environmental practices','Investing in renewable energy','Complying with environmental laws'], answer:1, explain:'Greenwashing is the practice of making deceptive or exaggerated claims about environmental efforts to appear more eco-friendly than reality.'}
    ],
    3: [
      {q:'Which government body in Sri Lanka protects consumer rights?', options:['Central Bank','Consumer Affairs Authority','Securities Commission','Board of Investment'], answer:1, explain:'The Consumer Affairs Authority (CAA) is responsible for consumer protection, price regulation, and fair trade practices in Sri Lanka.'},
      {q:'A consumer\'s right to safety means:', options:['Products should be affordable','Products should not harm the user when used as intended','Products should be available everywhere','Products should be luxurious'], answer:1, explain:'The right to safety protects consumers from hazardous products and requires goods to meet safety standards.'},
      {q:'The right to be informed entitles consumers to:', options:['Free products','Accurate information about products (ingredients, price, expiry)','Guaranteed refunds','Product delivery'], answer:1, explain:'Consumers have the right to receive truthful, complete information to make informed purchase decisions.'},
      {q:'A warranty is:', options:['A legal requirement for all products','A seller\'s promise to repair/replace a defective product within a period','A type of tax','An advertisement'], answer:1, explain:'A warranty is a written guarantee promising to repair or replace a product if it fails within a specified period.'},
      {q:'Which government regulation aims to prevent anti-competitive practices?', options:['Tax law','Competition law','Labor law','Environmental law'], answer:1, explain:'Competition law (antitrust) prevents monopolies, price-fixing, and other practices that restrict fair competition.'},
      {q:'A business license is:', options:['A tax document','Government permission to operate a business','An insurance policy','A bank loan'], answer:1, explain:'A business license is official authorization from a government agency to conduct business activities in a jurisdiction.'},
      {q:'The government\'s role in business includes:', options:['Setting private company prices','Providing infrastructure, enforcing contracts, and regulating markets','Managing all business operations','Guaranteeing business profits'], answer:1, explain:'Government provides essential functions: legal framework, infrastructure, contract enforcement, and market regulation.'},
      {q:'When a business lobbies the government, it is:', options:['Illegal in all countries','Attempting to influence policy or legislation in its favor','A form of taxation','Required by law'], answer:1, explain:'Lobbying is the act of attempting to influence government decisions on behalf of a business or interest group.'}
    ],
    4: [
      {q:'A sole proprietorship is owned by:', options:['Two or more partners','One person with unlimited liability','Shareholders','The government'], answer:1, explain:'A sole proprietorship has a single owner who bears unlimited liability for all business debts and obligations.'},
      {q:'A key disadvantage of a sole proprietorship is:', options:['Easy formation','Unlimited liability','Full control of profits','Simple decision-making'], answer:1, explain:'Unlimited liability means the owner\'s personal assets are at risk if the business incurs debts.'},
      {q:'In a partnership, partners typically have:', options:['Limited liability','Unlimited liability (in general partnership)','No liability','Liability only for their investment'], answer:1, explain:'In a general partnership, each partner has unlimited liability for the partnership\'s debts.'},
      {q:'A private limited company (Ltd) is characterized by:', options:['Shares traded on the stock exchange','Restricted share transfer and limited liability','Unlimited shareholders','No legal personality'], answer:1, explain:'A private limited company has restricted share transfer, limited liability for shareholders, and a separate legal personality.'},
      {q:'A public limited company (PLC) differs from a private company because it can:', options:['Have fewer shareholders','Sell shares to the public on the stock exchange','Avoid publishing accounts','Operate without directors'], answer:1, explain:'A PLC can offer its shares to the general public through a stock exchange listing, unlike a private company.'},
      {q:'Limited liability means shareholders:', options:['Are personally responsible for all company debts','Can only lose the value of their shares','Must pay company debts from personal assets','Have no financial risk'], answer:1, explain:'Shareholders\' liability is limited to the amount unpaid on their shares — personal assets are protected.'},
      {q:'A cooperative is owned and controlled by:', options:['A single entrepreneur','Its members (users or workers)','The government','Outside investors'], answer:1, explain:'Cooperatives are member-owned and democratically controlled, operating for mutual benefit rather than profit maximization.'},
      {q:'A franchise agreement involves:', options:['One business selling another the right to use its brand and system','Two companies merging','A government contract','A bank loan'], answer:0, explain:'Franchising: a franchisor grants a franchisee the right to operate under its brand and business system in exchange for fees.'}
    ],
    5: [
      {q:'Entrepreneurship is defined as:', options:['Managing an existing business','Identifying opportunities and creating value through innovation and risk-taking','Working as an employee','Investing in the stock market'], answer:1, explain:'Entrepreneurship involves recognizing opportunities, innovating, organizing resources, and accepting risk to create new ventures.'},
      {q:'Which characteristic is most commonly associated with successful entrepreneurs?', options:['Risk aversion','Self-motivation and perseverance','Preference for routine','Dependence on others'], answer:1, explain:'Successful entrepreneurs typically show initiative, perseverance, self-motivation, and willingness to take calculated risks.'},
      {q:'A business plan primarily serves to:', options:['Satisfy legal requirements','Outline business goals, strategies, and financial projections','Advertise the business','Replace accounting records'], answer:1, explain:'A business plan documents the venture\'s objectives, target market, competitive strategy, operations plan, and financial forecasts.'},
      {q:'Seed funding refers to:', options:['Government grants','Early-stage capital to develop a business idea','Bank loans for expansion','Stock market investment'], answer:1, explain:'Seed capital is the initial funding used to develop a business concept, conduct research, and build a prototype.'},
      {q:'A startup differs from a small business because a startup is:', options:['Always profitable from day one','Designed for rapid growth and scalability','Required to have 50+ employees','Funded only by banks'], answer:1, explain:'Startups are built for rapid growth and scalable business models, while small businesses typically aim for stable, local operations.'},
      {q:'An entrepreneur\'s opportunity cost includes:', options:['Only financial investment','The salary and benefits forgone by leaving employment','Marketing expenses','Office rent'], answer:1, explain:'Opportunity cost for an entrepreneur includes the foregone salary, benefits, and stability of traditional employment.'},
      {q:'Innovation in entrepreneurship means:', options:['Copying competitors\' products','Introducing new or improved products, services, or processes','Reducing prices','Hiring more staff'], answer:1, explain:'Innovation is the practical implementation of new ideas — new products, services, methods, or business models that create value.'},
      {q:'The main economic contribution of entrepreneurs is:', options:['Paying taxes','Job creation, innovation, and economic dynamism','Importing goods','Reducing competition'], answer:1, explain:'Entrepreneurs drive economic growth through innovation, competition, job creation, and efficient resource allocation.'}
    ],
    6: [
      {q:'The primary function of money is to serve as:', options:['A consumption good','A medium of exchange','A production input','A government document'], answer:1, explain:'The primary function of money is as a medium of exchange — widely accepted as payment for goods and services.'},
      {q:'Which is NOT a characteristic of good money?', options:['Durability','Portability','Scarcity','Divisibility'], answer:2, explain:'Good money should be durable, portable, divisible, uniform, and stable in value. Extreme scarcity (like rare art) makes poor money.'},
      {q:'A commercial bank\'s main function is to:', options:['Print currency','Accept deposits and provide loans','Regulate inflation','Collect taxes'], answer:1, explain:'Commercial banks accept deposits from savers and channel those funds to borrowers through loans — financial intermediation.'},
      {q:'The central bank acts as a lender of last resort to:', options:['Individual consumers','Commercial banks facing liquidity crises','Foreign governments','Stock market investors'], answer:1, explain:'As lender of last resort, the central bank provides emergency funds to commercial banks facing a liquidity shortage.'},
      {q:'A savings account typically offers:', options:['No interest','Lower interest than loans but higher than checking accounts','Very high returns','No withdrawal access'], answer:1, explain:'Savings accounts earn interest (lower than loan rates) and allow deposits/withdrawals, offering a safe place to store money.'},
      {q:'Monetary policy refers to actions by the central bank to:', options:['Control government spending','Manage money supply, interest rates, and credit conditions','Set tax rates','Regulate international trade'], answer:1, explain:'Monetary policy manages the money supply and credit conditions to achieve price stability, growth, and employment objectives.'},
      {q:'The reserve requirement is the percentage of:', options:['Profits banks must keep','Deposits banks must hold as reserves','Loans that must be repaid','Government bonds banks must buy'], answer:1, explain:'The reserve requirement is the fraction of customer deposits that banks must hold as reserves (not lend out).'},
      {q:'A development bank differs from a commercial bank by providing:', options:['Only savings accounts','Long-term financing for development projects','Only foreign currency loans','Interest-free loans'], answer:1, explain:'Development banks provide long-term capital for large development projects (infrastructure, industry, agriculture) that commercial banks may avoid.'}
    ],
    7: [
      {q:'Insurance is a contract where:', options:['The government guarantees your savings','An insurer provides financial protection against specific risks for a premium','Banks lend money at low interest','You invest in the stock market'], answer:1, explain:'Insurance is a risk-transfer mechanism where the insurer promises compensation for specified losses in exchange for premium payments.'},
      {q:'The principle of utmost good faith requires:', options:['Both parties to act honestly and disclose all material facts','The insurer to always pay claims','The insured to pay double premiums','Only written contracts'], answer:0, explain:'Utmost good faith (uberrimae fidei) requires full disclosure of all material facts by both the insured and insurer.'},
      {q:'Insurable interest means:', options:['Any person can insure any asset','The insured must benefit from the asset\'s existence and suffer from its loss','Interest rates determine premiums','Only businesses can get insurance'], answer:1, explain:'Insurable interest: the policyholder must suffer financial loss if the insured event occurs (you can\'t insure a stranger\'s house).'},
      {q:'A premium in insurance is:', options:['The amount paid by the insurer after a claim','The regular payment made by the insured to maintain coverage','The policy document','The deductible amount'], answer:1, explain:'The premium is the amount the insured pays (monthly/annually) to keep the insurance policy active.'},
      {q:'Life insurance provides:', options:['Coverage for car repairs','A lump sum payment to beneficiaries upon the insured\'s death','Health treatment','Property damage coverage'], answer:1, explain:'Life insurance pays a sum of money to designated beneficiaries when the insured person dies.'},
      {q:'General insurance covers:', options:['Only life events','Non-life risks including property, health, vehicle, and liability','Only health expenses','Investment products'], answer:1, explain:'General (non-life) insurance covers property, motor, health, travel, and liability risks.'},
      {q:'The principle of indemnity means:', options:['The insured can profit from a claim','Compensation should restore the insured to their pre-loss financial position','The insurer pays double','Claims must be paid in one year'], answer:1, explain:'Indemnity: insurance compensates for actual loss suffered — no more, no less — preventing the insured from profiting.'},
      {q:'Reinsurance is:', options:['Insurance for individuals','Insurance bought by insurers to spread their risk','Government insurance','A type of life insurance'], answer:1, explain:'Reinsurance is insurance purchased by an insurance company from another insurer to reduce its exposure to large claims.'}
    ],
    8: [
      {q:'Business communication is defined as:', options:['Only written messages','The sharing of information within and outside an organization for commercial benefit','Face-to-face conversations only','Sending emails'], answer:1, explain:'Business communication encompasses all information exchange (internal and external) that supports business operations and relationships.'},
      {q:'Which is an example of formal internal communication?', options:['Office gossip','A memorandum from management to staff','A WhatsApp group chat','Personal phone calls'], answer:1, explain:'A memo is a formal written message used for official internal communication within an organization.'},
      {q:'The communication process requires:', options:['Only a sender','A sender, message, channel, receiver, and feedback','Only a message','A computer'], answer:1, explain:'Effective communication requires a sender who encodes a message, transmits via a channel, and a receiver who decodes it and provides feedback.'},
      {q:'A key barrier to effective communication is:', options:['Clear language','Active listening','Semantic noise (jargon, ambiguous words)','Simple structure'], answer:2, explain:'Semantic noise — unclear language, jargon, or ambiguous terms — interferes with the receiver understanding the message.'},
      {q:'Non-verbal communication includes:', options:['Only written words','Body language, facial expressions, gestures, and tone of voice','Emails and reports','Telephone calls'], answer:1, explain:'Non-verbal communication conveys meaning without words — through posture, eye contact, gestures, and vocal tone.'},
      {q:'A downward communication flow moves from:', options:['Employees to managers','Managers to subordinates','Peers to peers','Customers to the company'], answer:1, explain:'Downward communication flows from higher to lower levels in the hierarchy (e.g., manager to employee instructions).'},
      {q:'Grapevine communication is:', options:['Official company announcements','Informal, unofficial communication through social networks','Government communications','Written memos'], answer:1, explain:'The grapevine is the informal communication network within an organization — rumors, gossip, and unofficial information sharing.'},
      {q:'Effective business writing should be:', options:['Complex and jargon-filled','Clear, concise, and audience-appropriate','As long as possible','Written in very small font'], answer:1, explain:'Good business writing prioritizes clarity, conciseness, accuracy, and adapting to the audience\'s needs.'}
    ]
  },
  ict: {
    1: [
      {q:'What base does the binary number system use?', options:['2','8','10','16'], answer:0, explain:'Binary (base-2) uses only two digits: 0 and 1.'},
      {q:'What is the hexadecimal equivalent of decimal 15?', options:['E','F','10','15'], answer:1, explain:'In hexadecimal (base-16), digits 10-15 are represented as A-F. Decimal 15 = F.'},
      {q:'How many bits are in a byte?', options:['4','8','16','32'], answer:1, explain:'A byte consists of 8 bits, which can represent 256 different values (0-255).'},
      {q:'What does ASCII stand for?', options:['American Standard Code for Information Interchange','Automatic System for Computer Information Input','Advanced Serial Character Identification Interface','American Serial Computer Information Index'], answer:0, explain:'ASCII is a standard character encoding that represents text in computers using numeric codes.'},
      {q:'What is the binary representation of decimal 10?', options:['1010','1100','1001','1110'], answer:0, explain:'10 in decimal = 1010 in binary (8 + 0 + 2 + 0).'}
    ],
    2: [
      {q:'What is the primary advantage of serial data transmission over parallel?', options:['Faster speed','Less interference over long distances','Higher bandwidth','Supports more devices'], answer:1, explain:'Serial transmission sends one bit at a time, which reduces interference and signal degradation over long distances compared to parallel.'},
      {q:'Which protocol is used for reliable data delivery on the internet?', options:['UDP','TCP','HTTP','FTP'], answer:1, explain:'TCP (Transmission Control Protocol) ensures reliable, ordered delivery of data with error checking.'},
      {q:'What is a parity bit used for?', options:['Encryption','Compression','Error detection','Data compression'], answer:2, explain:'A parity bit is added to data to detect errors during transmission by checking whether the number of 1-bits is even or odd.'},
      {q:'Which transmission mode allows data to flow in both directions simultaneously?', options:['Simplex','Half-duplex','Full-duplex','Multiplex'], answer:2, explain:'Full-duplex transmission allows simultaneous two-way communication, like a telephone call.'},
      {q:'What does a checksum do?', options:['Encrypts data','Verifies data integrity','Compresses data','Routes data'], answer:1, explain:'A checksum is a calculated value used to verify the integrity of data during transmission by detecting errors.'}
    ],
    3: [
      {q:'Which component is considered the "brain" of a computer?', options:['RAM','Hard drive','CPU','GPU'], answer:2, explain:'The CPU (Central Processing Unit) executes instructions and performs calculations, acting as the computer\'s brain.'},
      {q:'What type of memory loses its contents when power is turned off?', options:['ROM','Hard drive','RAM','SSD'], answer:2, explain:'RAM (Random Access Memory) is volatile — data is lost when the computer is powered off.'},
      {q:'Which of the following is an input device?', options:['Monitor','Printer','Keyboard','Speaker'], answer:2, explain:'A keyboard is an input device. Monitors, printers, and speakers are output devices.'},
      {q:'What does SSD stand for?', options:['Super Speed Drive','Solid State Drive','System Storage Device','Sequential Storage Disk'], answer:1, explain:'An SSD uses flash memory to store data with no moving parts, making it faster and more durable than a traditional HDD.'},
      {q:'Which component stores the BIOS/UEFI firmware?', options:['RAM','ROM','Cache','Hard drive'], answer:1, explain:'ROM (Read-Only Memory) stores firmware like BIOS/UEFI permanently and retains data when power is off.'}
    ],
    4: [
      {q:'Which of the following is an example of system software?', options:['Microsoft Word','Operating system','Photoshop','Chrome browser'], answer:1, explain:'An operating system is system software that manages hardware and provides services for application software.'},
      {q:'What is the primary role of an operating system?', options:['Create documents','Manage hardware and software resources','Browse the internet','Edit photos'], answer:1, explain:'The OS manages all hardware and software resources, including memory, processes, and peripherals.'},
      {q:'Which type of software is licensed with restrictions on modification and redistribution?', options:['Open source','Freeware','Proprietary','Public domain'], answer:2, explain:'Proprietary software is owned by an individual or company with restrictions on use, modification, and distribution.'},
      {q:'What is a utility program?', options:['A game','A system tool for maintenance tasks','A web browser','A spreadsheet application'], answer:1, explain:'Utility programs perform maintenance tasks like disk cleanup, antivirus scanning, and file compression.'},
      {q:'Which of the following is NOT a function of an operating system?', options:['Memory management','File management','Creating spreadsheets','Process scheduling'], answer:2, explain:'Creating spreadsheets is an application function, not an OS function.'}
    ],
    5: [
      {q:'What does LAN stand for?', options:['Large Area Network','Local Area Network','Long Access Network','Linked Application Network'], answer:1, explain:'A LAN (Local Area Network) connects computers within a limited area like a home, school, or office.'},
      {q:'Which network topology connects all devices to a single central cable?', options:['Star','Ring','Bus','Mesh'], answer:2, explain:'In a bus topology, all devices are connected to a single backbone cable.'},
      {q:'What is the purpose of an IP address?', options:['To identify a device on a network','To store data','To power the device','To process graphics'], answer:0, explain:'An IP address uniquely identifies a device on a network, enabling data to be routed to the correct destination.'},
      {q:'What is the difference between a hub and a switch?', options:['A switch is faster than a hub','A hub is faster than a switch','They are the same','A hub uses IP addresses'], answer:0, explain:'A switch is more intelligent than a hub — it sends data only to the specific destination device rather than broadcasting to all ports.'},
      {q:'Which wireless technology has the shortest range?', options:['Wi-Fi','Bluetooth','Cellular','Satellite'], answer:1, explain:'Bluetooth has the shortest range (typically ~10 meters) compared to Wi-Fi, cellular, and satellite.'}
    ],
    6: [
      {q:'What is the primary goal of cybersecurity?', options:['To make all data public','To protect systems and data from threats','To increase internet speed','To reduce hardware costs'], answer:1, explain:'Cybersecurity aims to protect computer systems, networks, and data from unauthorized access, attacks, and damage.'},
      {q:'What is encryption?', options:['Deleting data','Converting data into a coded form to prevent unauthorized access','Compressing files','Backing up data'], answer:1, explain:'Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) using an algorithm and key.'},
      {q:'Which of the following is a form of malware?', options:['Firewall','Antivirus','Trojan horse','Router'], answer:2, explain:'A Trojan horse is a type of malware that disguises itself as legitimate software to trick users into installing it.'},
      {q:'What is the purpose of two-factor authentication (2FA)?', options:['To use two passwords','To add an extra layer of security beyond just a password','To connect to two networks','To create two accounts'], answer:1, explain:'2FA requires two different verification factors, significantly improving account security beyond a password alone.'},
      {q:'What is phishing?', options:['A fishing sport','A social engineering attack to steal sensitive information','A type of firewall','A programming language'], answer:1, explain:'Phishing is a cyberattack that uses deceptive emails or messages to trick users into revealing passwords, credit card numbers, or other sensitive data.'}
    ],
    7: [
      {q:'What is a relational database?', options:['A database stored in a single file','A database that organizes data into tables with relationships','A database with no structure','A database that only stores text'], answer:1, explain:'A relational database organizes data into tables (relations) that can be linked through common fields (keys).'},
      {q:'What does SQL stand for?', options:['Simple Query Language','Structured Query Language','Standard Question Language','System Query Logic'], answer:1, explain:'SQL (Structured Query Language) is used to manage and manipulate relational databases.'},
      {q:'Which SQL statement is used to retrieve data from a table?', options:['INSERT','UPDATE','SELECT','DELETE'], answer:2, explain:'The SELECT statement retrieves data from one or more tables in a database.'},
      {q:'What is a primary key?', options:['A field that can be null','A field that uniquely identifies each record in a table','The first field in a table','A field that stores passwords'], answer:1, explain:'A primary key is a column (or set of columns) that uniquely identifies each row in a database table.'},
      {q:'What does a foreign key do?', options:['Creates a new table','Links two tables together','Deletes duplicate data','Sorts the data'], answer:1, explain:'A foreign key in one table references the primary key of another table, creating a relationship between them.'}
    ],
    8: [
      {q:'What is an algorithm?', options:['A computer hardware component','A step-by-step procedure to solve a problem','A type of programming language','A network protocol'], answer:1, explain:'An algorithm is a finite sequence of well-defined steps to solve a specific problem or accomplish a task.'},
      {q:'What symbol is used for a decision in a flowchart?', options:['Rectangle','Circle','Diamond','Parallelogram'], answer:2, explain:'A diamond (rhombus) shape in flowcharts represents a decision or conditional branch (yes/no).'},
      {q:'Which sorting algorithm repeatedly steps through a list and swaps adjacent elements?', options:['Quick sort','Merge sort','Bubble sort','Insertion sort'], answer:2, explain:'Bubble sort repeatedly compares and swaps adjacent elements if they are in the wrong order.'},
      {q:'What is pseudocode?', options:['An actual programming language','A plain language description of algorithm steps','A type of computer virus','A debugging tool'], answer:1, explain:'Pseudocode uses plain language mixed with programming concepts to describe algorithms without strict syntax rules.'},
      {q:'What is the time complexity of binary search?', options:['O(n)','O(n²)','O(log n)','O(1)'], answer:2, explain:'Binary search has O(log n) time complexity — it halves the search space with each step, making it very efficient for sorted data.'}
    ],
    9: [
      {q:'What is a variable in programming?', options:['A fixed value that never changes','A named storage location for data that can change','A mathematical equation','A type of loop'], answer:1, explain:'A variable is a named memory location that stores a value which can be changed during program execution.'},
      {q:'Which data type stores whole numbers?', options:['Float','String','Boolean','Integer'], answer:3, explain:'An integer (int) stores whole numbers without decimal points (e.g., 42, -7, 0).'},
      {q:'What does the comparison operator "!=" mean?', options:['Equal to','Not equal to','Assignment','Approximately'], answer:1, explain:'!= is the "not equal to" operator used to compare two values.'},
      {q:'What is a boolean value?', options:['A number with decimals','A value that is either true or false','A collection of characters','A memory address'], answer:1, explain:'A boolean represents a logical state: either true or false.'},
      {q:'What is the result of 7 % 3?', options:['2','1','3','2.33'], answer:1, explain:'% is the modulo operator — 7 divided by 3 is 2 remainder 1, so 7 % 3 = 1.'}
    ],
    10: [
      {q:'What function is used to display output in Python?', options:['output()','display()','print()','write()'], answer:2, explain:'print() is Python\'s built-in function for displaying output to the console.'},
      {q:'Which of the following is a valid variable name in Python?', options:['2name','my-name','my_name','my name'], answer:2, explain:'Variable names can include underscores but cannot start with a number or contain spaces/hyphens.'},
      {q:'What type does input() always return?', options:['Integer','Float','String','List'], answer:2, explain:'input() always returns a string. Use int() or float() to convert to numeric types.'},
      {q:'Which keyword starts a conditional block in Python?', options:['when','if','switch','case'], answer:1, explain:'Python uses if, elif, and else for conditional logic.'},
      {q:'What does range(1, 6) generate?', options:['1,2,3,4,5,6','1,2,3,4,5','0,1,2,3,4,5','0,1,2,3,4'], answer:1, explain:'range(1,6) goes from 1 to 5 (stop is exclusive).'},
      {q:'How do you exit a loop immediately?', options:['stop','exit','break','return'], answer:2, explain:'The break statement exits the current loop immediately.'},
      {q:'Which symbol is used for comments in Python?', options:['//','/* */','#','--'], answer:2, explain:'Python uses # for single-line comments.'},
      {q:'What is the correct indentation for Python code blocks?', options:['2 spaces','4 spaces','1 tab','Any of the above, but consistent'], answer:3, explain:'Python requires consistent indentation. The standard is 4 spaces, but any consistent indentation works.'}
    ],
    11: [
      {q:'How do you define a function in Python?', options:['function myFunc():','def myFunc():','func myFunc():','define myFunc():'], answer:1, explain:'Python uses the def keyword to define a function: def function_name():'},
      {q:'What is the purpose of the return statement?', options:['To end the program','To send a value back from a function','To print output','To restart the function'], answer:1, explain:'The return statement exits a function and optionally sends a value back to the caller.'},
      {q:'Which mode opens a file for reading in Python?', options:['"w"','"a"','"r"','"x"'], answer:2, explain:'"r" opens a file for reading (default mode). "w" is for writing, "a" for appending.'},
      {q:'What is a module in Python?', options:['A hardware component','A file containing Python code with functions and variables','A type of loop','A debugging tool'], answer:1, explain:'A module is a .py file containing reusable Python code, including functions, classes, and variables.'},
      {q:'What keyword is used to import a module?', options:['include','using','import','require'], answer:2, explain:'The import keyword is used to bring a module into the current Python file.'}
    ],
    12: [
      {q:'What does HTML stand for?', options:['HyperText Markup Language','High Tech Modern Language','HyperTransfer Markup Language','Home Tool Markup Language'], answer:0, explain:'HTML (HyperText Markup Language) is the standard language for creating web pages.'},
      {q:'Which HTML tag is used for the largest heading?', options:['<heading>','<h1>','<head>','<h6>'], answer:1, explain:'<h1> defines the most important (largest) heading in HTML.'},
      {q:'What does CSS stand for?', options:['Computer Style Sheets','Cascading Style Sheets','Colorful Style System','Creative Styling Language'], answer:1, explain:'CSS (Cascading Style Sheets) controls the presentation and layout of HTML elements.'},
      {q:'Which JavaScript function outputs a message to the browser console?', options:['print()','log()','console.log()','write()'], answer:2, explain:'console.log() is used in JavaScript to print messages to the browser developer console.'},
      {q:'What is the purpose of a web browser?', options:['To create web pages','To render and display web content','To store databases','To manage files'], answer:1, explain:'A web browser retrieves, renders, and displays web content (HTML, CSS, JavaScript) for users.'}
    ]
  }
};

export const FLASHCARDS_DATA = {
  economics: {
    1: [
      { front:'What is the fundamental economic problem?', back:'Scarcity — unlimited human wants exceed limited resources, forcing choices about allocation.' },
      { front:'Define opportunity cost.', back:'The value of the next best alternative forgone when a choice is made.' },
      { front:'What are the four factors of production?', back:'Land, labour, capital, and entrepreneurship.' },
      { front:'What does a point inside the PPC indicate?', back:'Underutilization of resources — the economy is not producing at its full potential.' },
      { front:'What is the difference between needs and wants?', back:'Needs are essential for survival (food, water, shelter); wants are non-essential desires.' },
      { front:'What does a rightward shift of the PPC represent?', back:'Economic growth — an increase in the economy\'s productive capacity.' },
      { front:'In a market economy, how are resources allocated?', back:'Through the price mechanism — supply and demand forces determine allocation.' },
      { front:'What three basic questions must every economy answer?', back:'What to produce? How to produce? For whom to produce?' }
    ],
    2: [
      { front:'State the law of demand.', back:'As price increases, quantity demanded decreases (inverse relationship).' },
      { front:'What is market equilibrium?', back:'The point where quantity demanded equals quantity supplied.' },
      { front:'What causes a surplus in a market?', back:'Price is above equilibrium — quantity supplied exceeds quantity demanded.' },
      { front:'What causes a shortage in a market?', back:'Price is below equilibrium — quantity demanded exceeds quantity supplied.' },
      { front:'What does price elasticity of demand measure?', back:'How responsive quantity demanded is to a change in price.' },
      { front:'What type of good sees demand increase when consumer income rises?', back:'A normal good.' },
      { front:'What happens to the demand for a substitute when the price of the other good rises?', back:'Demand for the substitute increases (rightward shift).' }
    ],
    3: [
      { front:'What is a price ceiling?', back:'A government-imposed maximum price below equilibrium, intended to make essential goods affordable.' },
      { front:'What is a price floor?', back:'A government-imposed minimum price above equilibrium, often used to protect producers.' },
      { front:'How does a tax affect the supply curve?', back:'A tax shifts the supply curve to the left (decreases supply at every price).' },
      { front:'How does a subsidy affect the supply curve?', back:'A subsidy shifts the supply curve to the right (increases supply at every price).' },
      { front:'What is the burden of a tax called?', back:'Tax incidence — how the tax burden is shared between consumers and producers.' },
      { front:'What is a buffer stock scheme?', back:'A government intervention to stabilize prices by buying surplus and releasing shortages.' }
    ],
    4: [
      { front:'What is the law of diminishing returns?', back:'As more of a variable input is added to fixed inputs, the marginal product eventually decreases.' },
      { front:'What are economies of scale?', back:'Cost advantages when production increases — average cost falls as output rises.' },
      { front:'What are diseconomies of scale?', back:'Cost disadvantages when a firm becomes too large — average cost rises.' },
      { front:'What is the difference between fixed and variable costs?', back:'Fixed costs do not change with output (rent); variable costs change with output (raw materials).' },
      { front:'What is a perfectly competitive market?', back:'Many buyers and sellers, identical products, no barriers to entry, perfect information.' },
      { front:'What is a monopoly?', back:'A market with a single seller, high barriers to entry, and price-making power.' }
    ],
    5: [
      { front:'What is GDP?', back:'Gross Domestic Product — the total market value of all final goods and services produced within a country in a given period.' },
      { front:'What is the difference between GDP and GNP?', back:'GDP measures output within borders; GNP measures output by residents wherever located.' },
      { front:'What are the three approaches to measuring GDP?', back:'Output (production), income, and expenditure approaches.' },
      { front:'What is the circular flow of income?', back:'A model showing money flows between households, firms, government, and the foreign sector.' },
      { front:'What is the difference between nominal and real GDP?', back:'Nominal GDP is at current prices; real GDP adjusts for inflation.' },
      { front:'What is GNI per capita?', back:'Gross National Income divided by population — a measure of average income.' }
    ],
    6: [
      { front:'What is aggregate demand?', back:'Total spending on goods and services in an economy at a given price level.' },
      { front:'What is aggregate supply?', back:'Total output of goods and services that firms are willing and able to produce.' },
      { front:'What is the business cycle?', back:'Fluctuations in economic activity — boom, recession, trough, recovery.' },
      { front:'What is fiscal policy?', back:'Government use of taxation and spending to influence the economy.' },
      { front:'What is monetary policy?', back:'Central bank actions to control money supply and interest rates.' },
      { front:'What is the multiplier effect?', back:'An initial change in spending leads to a larger final change in national income.' }
    ],
    7: [
      { front:'What is inflation?', back:'A sustained increase in the general price level of goods and services.' },
      { front:'How is inflation measured?', back:'By the Consumer Price Index (CPI) — the price change of a representative basket of goods.' },
      { front:'What is demand-pull inflation?', back:'Inflation caused by excess aggregate demand relative to supply.' },
      { front:'What is cost-push inflation?', back:'Inflation caused by rising production costs (wages, raw materials).' },
      { front:'What is the quantity theory of money?', back:'MV = PT — the money supply times velocity equals price level times transactions.' },
      { front:'What is deflation?', back:'A sustained decrease in the general price level, often harmful to economic growth.' }
    ],
    8: [
      { front:'What are externalities?', back:'Spillover effects of production or consumption affecting third parties not in the market.' },
      { front:'What is a negative externality?', back:'A harmful spillover effect, e.g., pollution from a factory affecting nearby residents.' },
      { front:'What is a positive externality?', back:'A beneficial spillover effect, e.g., vaccination reducing disease spread.' },
      { front:'What is a public good?', back:'A good that is non-rival and non-excludable, e.g., street lighting, national defence.' },
      { front:'What is the free rider problem?', back:'People benefit from a public good without paying for it.' },
      { front:'What is asymmetric information?', back:'One party in a transaction has more information than the other, leading to market failure.' }
    ],
    9: [
      { front:'What is protectionism?', back:'Government policies that restrict international trade to protect domestic industries.' },
      { front:'What is a tariff?', back:'A tax on imported goods, raising their price and protecting domestic producers.' },
      { front:'What is a quota?', back:'A physical limit on the quantity of a good that can be imported.' },
      { front:'What is a subsidy for domestic industries?', back:'Government payments to local firms, making them more competitive against imports.' },
      { front:'What is dumping?', back:'Exporting goods at below production cost to gain market share.' },
      { front:'What is a non-tariff barrier?', back:'Regulations, standards, or licensing requirements that restrict imports without a tax.' }
    ],
    10: [
      { front:'What is an exchange rate?', back:'The price of one currency expressed in terms of another currency.' },
      { front:'What is a floating exchange rate?', back:'The currency value is determined by market supply and demand without government intervention.' },
      { front:'What is a fixed exchange rate?', back:'The currency value is pegged to another currency or basket by the central bank.' },
      { front:'What causes currency appreciation?', back:'Increased demand for the currency due to higher exports, investment inflows, or interest rates.' },
      { front:'What is the balance of payments?', back:'A record of all economic transactions between residents and the rest of the world.' },
      { front:'What is the current account?', back:'The part of the balance of payments recording trade in goods, services, income, and transfers.' }
    ],
    11: [
      { front:'What is economic growth?', back:'An increase in an economy\'s productive capacity, measured by real GDP growth.' },
      { front:'What is sustainable development?', back:'Development that meets present needs without compromising future generations\' ability to meet theirs.' },
      { front:'What is the Human Development Index (HDI)?', back:'A composite measure of life expectancy, education, and income per capita.' },
      { front:'What is a developing country?', back:'A country with low income, weak infrastructure, and limited access to healthcare and education.' },
      { front:'What is foreign direct investment (FDI)?', back:'Investment by a company in production facilities in another country.' },
      { front:'What is the role of the World Bank?', back:'Providing loans and grants to developing countries for poverty reduction and development.' }
    ],
    12: [
      { front:'What was the dominant export crop of colonial Ceylon?', back:'Coffee, later replaced by tea after the 1870s coffee rust epidemic.' },
      { front:'What is the plantation economy?', back:'An economy dominated by large-scale export-oriented agricultural estates.' },
      { front:'What was the impact of British colonial rule on Sri Lanka\'s economy?', back:'Introduction of plantation agriculture, infrastructure development, but resource extraction.' },
      { front:'What economic reforms followed Sri Lanka\'s independence in 1948?', back:'Import substitution, welfare state expansion, and nationalization of key industries.' },
      { front:'What was the 1977 economic liberalization in Sri Lanka?', back:'Shift from protectionism to open market policies, trade liberalization, and privatization.' },
      { front:'What are Sri Lanka\'s main export commodities today?', back:'Textiles and garments, tea, rubber, coconut products, and tourism services.' }
    ]
  },
  business: {
    1: [
      { front:'What is the primary purpose of a business?', back:'To produce goods and services that satisfy human needs and wants.' },
      { front:'Who are the stakeholders of a business?', back:'Shareholders, employees, customers, suppliers, government, and the community.' },
      { front:'What does PEST analysis examine?', back:'Political, Economic, Social, and Technological factors affecting a business.' },
      { front:'What is a sole trader?', back:'A business owned by one person with unlimited liability for debts.' },
      { front:'What does the secondary sector involve?', back:'Manufacturing and construction — transforming raw materials into finished goods.' },
      { front:'What is opportunity cost for a business?', back:'The benefit given up from the next best alternative when making a decision.' }
    ],
    2: [
      { front:'What is Corporate Social Responsibility (CSR)?', back:'A business\'s voluntary commitment to operate ethically beyond legal requirements.' },
      { front:'What is the triple bottom line?', back:'A framework measuring performance across People, Planet, and Profit.' },
      { front:'What is ethical trading?', back:'Ensuring fair wages, safe working conditions, and human rights throughout the supply chain.' },
      { front:'What is greenwashing?', back:'Making misleading claims about environmental practices to appear more eco-friendly.' },
      { front:'Can a business act legally but unethically?', back:'Yes — legal compliance does not equal ethical behavior. CSR goes beyond the law.' }
    ],
    3: [
      { front:'What is consumer protection?', back:'Laws and regulations safeguarding consumers from unfair or unsafe business practices.' },
      { front:'What is the Consumer Affairs Authority?', back:'The Sri Lankan body responsible for enforcing consumer protection laws and market competition.' },
      { front:'What is a monopoly in business?', back:'A single firm dominating a market with no close substitutes, able to set prices.' },
      { front:'What is fair competition?', back:'Business practices that comply with regulations ensuring no single firm can dominate unfairly.' },
      { front:'What is price fixing?', back:'When competing firms collude to set prices rather than letting market forces determine them.' },
      { front:'What is the role of the World Trade Organization (WTO)?', back:'Setting rules for international trade and resolving disputes between member countries.' }
    ],
    4: [
      { front:'What is limited liability?', back:'Shareholders are only liable for company debts up to the value of their shares.' },
      { front:'What is a private limited company (Ltd)?', back:'A company with restricted share ownership, limited liability, and cannot offer shares to the public.' },
      { front:'What is a public limited company (PLC)?', back:'A company whose shares can be bought by the public on a stock exchange.' },
      { front:'What is a partnership?', back:'A business owned by 2-20 partners who share profits, losses, and managerial responsibilities.' },
      { front:'What is a cooperative?', back:'A business owned and controlled by its members who share profits equally.' },
      { front:'What is a franchise?', back:'A business model where a franchisee licenses the brand and system from a franchisor.' }
    ],
    5: [
      { front:'What is entrepreneurship?', back:'The process of identifying opportunities, taking risks, and starting new ventures.' },
      { front:'What are the characteristics of a successful entrepreneur?', back:'Risk-taking, innovation, leadership, resilience, and opportunity recognition.' },
      { front:'What is a business plan?', back:'A document outlining business goals, strategies, market analysis, and financial projections.' },
      { front:'What is market research?', back:'The process of gathering and analyzing data about customers, competitors, and market conditions.' },
      { front:'What is a feasibility study?', back:'An assessment of whether a business idea is viable technically, financially, and operationally.' },
      { front:'What sources of finance are available to startups?', back:'Personal savings, bank loans, angel investors, venture capital, and government grants.' }
    ],
    6: [
      { front:'What are the functions of money?', back:'Medium of exchange, store of value, unit of account, and standard of deferred payment.' },
      { front:'What is a central bank?', back:'The institution responsible for monetary policy, issuing currency, and regulating the banking system.' },
      { front:'What is the role of commercial banks?', back:'Accepting deposits, granting loans, facilitating payments, and creating credit.' },
      { front:'What is the difference between saving and investing?', back:'Saving is setting aside money; investing is using money to earn returns through assets.' },
      { front:'What is interest?', back:'The cost of borrowing money or the return on lending, expressed as a percentage.' },
      { front:'What is inflation\'s effect on savings?', back:'Inflation erodes the purchasing power of money, reducing the real value of savings.' }
    ],
    7: [
      { front:'What is insurance?', back:'A contract where an insurer provides financial protection against specified risks in exchange for premiums.' },
      { front:'What is the principle of indemnity?', back:'Insurance restores the insured to their financial position before the loss, not to profit.' },
      { front:'What is life insurance?', back:'Insurance that pays a sum to beneficiaries upon the death of the insured person.' },
      { front:'What is general insurance?', back:'Non-life insurance covering property, vehicles, health, and travel.' },
      { front:'What is a premium?', back:'The periodic payment made by the insured to the insurer for coverage.' },
      { front:'What is an insurance claim?', back:'A formal request by the policyholder for compensation after a covered loss occurs.' }
    ],
    8: [
      { front:'What is business communication?', back:'The sharing of information within and outside an organization for commercial benefit.' },
      { front:'What is the difference between formal and informal communication?', back:'Formal follows official channels; informal occurs spontaneously through social networks.' },
      { front:'What is vertical communication?', back:'Communication up and down the organizational hierarchy (manager to employee and vice versa).' },
      { front:'What is horizontal communication?', back:'Communication between employees at the same level in the organizational structure.' },
      { front:'What are barriers to effective communication?', back:'Noise, language differences, cultural barriers, information overload, and selective perception.' },
      { front:'What is non-verbal communication?', back:'Communication through body language, facial expressions, gestures, and tone of voice.' }
    ]
  },
  ict: {
    1: [
      { front:'What base does binary use?', back:'Base-2 — uses digits 0 and 1.' },
      { front:'How many bits are in a byte?', back:'8 bits.' },
      { front:'What is the hexadecimal equivalent of decimal 15?', back:'F.' },
      { front:'What does ASCII represent?', back:'A standard character encoding that maps characters to numeric codes.' },
      { front:'What is 10 in binary?', back:'1010.' },
      { front:'What is a nibble?', back:'4 bits (half a byte).' }
    ],
    2: [
      { front:'What is serial data transmission?', back:'Data sent one bit at a time over a single channel.' },
      { front:'What does TCP stand for?', back:'Transmission Control Protocol — ensures reliable data delivery.' },
      { front:'What is a parity bit used for?', back:'Error detection during data transmission.' },
      { front:'What is full-duplex transmission?', back:'Data flows in both directions simultaneously.' },
      { front:'What does UDP stand for?', back:'User Datagram Protocol — faster but less reliable than TCP.' },
      { front:'What is a checksum?', back:'A value used to verify data integrity during transmission.' }
    ],
    3: [
      { front:'What does CPU stand for?', back:'Central Processing Unit — the brain of the computer.' },
      { front:'What type of memory is volatile?', back:'RAM — loses data when power is turned off.' },
      { front:'What does SSD stand for?', back:'Solid State Drive — fast storage with no moving parts.' },
      { front:'What is ROM used for?', back:'Storing firmware like BIOS/UEFI permanently.' },
      { front:'Name three input devices.', back:'Keyboard, mouse, microphone, scanner, etc.' }
    ],
    4: [
      { front:'What is system software?', back:'Software that manages hardware and provides a platform for applications (e.g., OS).' },
      { front:'What is the role of an operating system?', back:'Manage hardware, software resources, and provide user interface.' },
      { front:'What is proprietary software?', back:'Software owned with restrictions on modification and distribution.' },
      { front:'What is a utility program?', back:'A system tool for maintenance (disk cleanup, antivirus, compression).' },
      { front:'What is open source software?', back:'Software with freely available source code that can be modified and distributed.' }
    ],
    5: [
      { front:'What does LAN stand for?', back:'Local Area Network — connects devices in a limited area.' },
      { front:'What is the difference between a hub and a switch?', back:'A switch sends data only to the destination; a hub broadcasts to all ports.' },
      { front:'What is an IP address?', back:'A unique identifier for a device on a network.' },
      { front:'What is a star topology?', back:'All devices connect to a central hub/switch.' },
      { front:'What does WAN stand for?', back:'Wide Area Network — connects networks over large geographic areas.' }
    ],
    6: [
      { front:'What is cybersecurity?', back:'Protecting systems and data from unauthorized access and attacks.' },
      { front:'What is encryption?', back:'Converting data into coded form to prevent unauthorized access.' },
      { front:'What is a Trojan horse?', back:'Malware disguised as legitimate software.' },
      { front:'What is two-factor authentication?', back:'An extra security layer requiring two verification factors.' },
      { front:'What is phishing?', back:'A social engineering attack to steal sensitive information via deceptive messages.' }
    ],
    7: [
      { front:'What is a relational database?', back:'Data organized into tables with relationships between them.' },
      { front:'What does SQL stand for?', back:'Structured Query Language.' },
      { front:'What SQL statement retrieves data?', back:'SELECT.' },
      { front:'What is a primary key?', back:'A field that uniquely identifies each record in a table.' },
      { front:'What is a foreign key?', back:'A field that links two tables by referencing the primary key of another table.' }
    ],
    8: [
      { front:'What is an algorithm?', back:'A step-by-step procedure to solve a problem.' },
      { front:'What shape represents a decision in a flowchart?', back:'A diamond.' },
      { front:'What is bubble sort?', back:'A sorting algorithm that repeatedly swaps adjacent elements.' },
      { front:'What is pseudocode?', back:'A plain-language description of algorithm steps.' },
      { front:'What is binary search?', back:'A search algorithm that halves the search space each step — O(log n).' }
    ],
    9: [
      { front:'What is a variable?', back:'A named storage location for data that can change during execution.' },
      { front:'Name four common data types.', back:'Integer, float, string, boolean.' },
      { front:'What is a boolean?', back:'A value that is either true or false.' },
      { front:'What does the modulo operator (%) do?', back:'Returns the remainder of a division.' },
      { front:'What is an operator?', back:'A symbol that performs an operation on values (e.g., +, -, *, /).' }
    ],
    10: [
      { front:'How do you display output in Python?', back:'Using print().' },
      { front:'What does input() always return?', back:'A string.' },
      { front:'What keyword starts a conditional in Python?', back:'if.' },
      { front:'How do you exit a loop in Python?', back:'Using the break statement.' },
      { front:'What does range(1, 6) generate?', back:'1, 2, 3, 4, 5.' },
      { front:'What is the correct Python indentation?', back:'Consistent indentation (standard is 4 spaces).' }
    ],
    11: [
      { front:'How do you define a function in Python?', back:'Using the def keyword.' },
      { front:'What does the return statement do?', back:'Sends a value back from a function to the caller.' },
      { front:'What mode opens a file for reading in Python?', back:'"r" mode.' },
      { front:'What is a Python module?', back:'A .py file with reusable functions, classes, and variables.' },
      { front:'What keyword imports a module?', back:'import.' }
    ],
    12: [
      { front:'What does HTML stand for?', back:'HyperText Markup Language.' },
      { front:'What tag is used for the largest heading in HTML?', back:'<h1>.' },
      { front:'What does CSS stand for?', back:'Cascading Style Sheets.' },
      { front:'How do you output to the browser console in JavaScript?', back:'console.log().' },
      { front:'What is the role of a web browser?', back:'To render and display web content.' }
    ]
  }
};

export const LESSON_NOTES = {
  economics: {
    1: {
      title: "Introduction to Economics",
      sections: [
        {
          title: "What is Economics?",
          type: "text",
          content: "Every subject in the world can be divided into two main parts:\n\n1. Natural Sciences: Studies natural phenomena based on laboratory tests (e.g. Physics, Chemistry, Biology).\n2. Social Sciences: Studies the behavior of people in society (e.g. Political Science, Psychology, Sociology, History).\n\nEconomics is a Social Science because it studies the economic behavior of people. It is often referred to as the 'Queen of Social Sciences'. Adam Smith is considered the Father of Economics, publishing 'The Wealth of Nations' in 1776."
        },
        {
          title: "Microeconomics vs Macroeconomics",
          type: "comparison",
          leftTitle: "Microeconomics",
          leftItems: ["Study of economics as units", "Small units: households, firms, individuals", "Analyzes separate variables"],
          rightTitle: "Macroeconomics",
          rightItems: ["Study of economics as a whole", "Aggregate economic behavior", "National income, inflation, unemployment"]
        },
        {
          title: "Positive vs Normative Statements",
          type: "comparison",
          leftTitle: "Positive Statements",
          leftItems: ["Answer: what is / what happened", "Can be verified with real facts", "Scientific and objective", "Ex: 'Money supply inflation connection'"],
          rightTitle: "Normative Statements",
          rightItems: ["Answer: what should be", "Based on personal views and beliefs", "Subjective — hard to test", "Ex: 'Sri Lanka should obtain aid'"]
        },
        {
          title: "Needs & Wants",
          type: "comparison",
          leftTitle: "Needs",
          leftItems: ["Basic necessities to sustain life", "Biological sources", "Limited", "Do not change with time", "Common to all", "Ex: Food"],
          rightTitle: "Wants",
          rightItems: ["Various forms of fulfilling needs", "Combined with traditions, culture", "Unlimited", "Change with time", "Differ from person to person", "Ex: Rice, Bread, Hoppers"]
        },
        {
          title: "Production Resources (Factors)",
          type: "cards",
          items: [
            { label: "Land", desc: "Natural resources (forests, water, minerals). Payment: Rent" },
            { label: "Labour", desc: "Mental & physical human effort. Payment: Wages" },
            { label: "Capital", desc: "Man-made aids for production (machinery). Payment: Interest" },
            { label: "Entrepreneurship", desc: "Venture creation, risk-bearing. Payment: Profit" }
          ]
        }
      ]
    },
    2: {
      title: "Demand, Supply & Market Equilibrium",
      sections: [
        {
          title: "The Law of Demand",
          type: "text",
          content: "The Law of Demand states that as the price of a good increases, the quantity demanded decreases (and vice versa), assuming all other factors remain constant (ceteris paribus). There is an inverse relationship between price and quantity demanded.\n\nFactors shifting the demand curve to the right:\n- Increase in consumer income (for normal goods)\n- Increase in price of substitute goods\n- Decrease in price of complementary goods\n- Favorable change in consumer tastes and preferences"
        },
        {
          title: "The Law of Supply",
          type: "text",
          content: "The Law of Supply states that as the price of a good increases, the quantity supplied increases (and vice versa), assuming all other factors remain constant. There is a direct relationship between price and quantity supplied.\n\nFactors shifting the supply curve to the left (decreasing supply):\n- Increase in the cost of raw materials (input costs)\n- Tax increases on production\n- Decline in technology or exit of firms"
        },
        {
          title: "Market Equilibrium",
          type: "text",
          content: "Market equilibrium occurs at the price level where the quantity demanded by consumers equals the quantity supplied by producers. At this equilibrium price, there is neither a shortage nor a surplus in the market.\n\n- Surplus: Occurs when price is set above equilibrium. Quantity supplied exceeds quantity demanded, putting downward pressure on price.\n- Shortage: Occurs when price is set below equilibrium. Quantity demanded exceeds quantity supplied, putting upward pressure on price."
        },
        {
          title: "Elasticities",
          type: "cards",
          items: [
            { label: "Price Elasticity of Demand (PED)", desc: "Measures responsiveness of quantity demanded to price changes. PED < 1 is inelastic, PED > 1 is elastic." },
            { label: "Income Elasticity (YED)", desc: "Measures responsiveness of demand to consumer income. Positive for normal goods, negative for inferior goods." },
            { label: "Cross-Price Elasticity (XED)", desc: "Measures responsiveness of demand to price change of another good. Positive for substitutes, negative for complements." }
          ]
        }
      ]
    },
    3: { title: "Government Intervention", sections: [{ title: "Overview", type: "text", content: "Topics include price ceilings, price floors, indirect taxes, subsidies, and state ownership." }] },
    4: { title: "Production, Cost & Market Structures", sections: [{ title: "Overview", type: "text", content: "Topics include production functions, short run vs long run, costs of production, perfect competition, oligopoly, and monopoly." }] },
    5: { title: "National Accounting", sections: [{ title: "Overview", type: "text", content: "Topics include circular flow of income, GDP, GNP, national income calculation methods, and limitations of national accounting." }] },
    6: { title: "Macroeconomic Concepts", sections: [{ title: "Overview", type: "text", content: "Topics include aggregate demand, aggregate supply, unemployment causes, business cycle phases, and policy targets." }] },
    7: { title: "Price, Inflation, Money & Financial System", sections: [{ title: "Overview", type: "text", content: "Topics include price indices, demand-pull vs cost-push inflation, functions of money, commercial banking, and central bank tools." }] },
    8: { title: "Market Failure, Government & Public Finance", sections: [{ title: "Overview", type: "text", content: "Topics include externalities, public goods, merit goods, government expenditure, and tax systems." }] },
    9: { title: "Protectionism & Foreign Investments", sections: [{ title: "Overview", type: "text", content: "Topics include absolute and comparative advantage, tariffs, quotas, foreign direct investment, and multinational companies." }] },
    10: { title: "Foreign Exchange & Balance of Payments", sections: [{ title: "Overview", type: "text", content: "Topics include exchange rate regimes, balance of payments structure, current account deficits, and capital flows." }] },
    11: { title: "Economic Growth, Development & Labour", sections: [{ title: "Overview", type: "text", content: "Topics include factors of economic growth, Human Development Index (HDI), labor market supply/demand, and education." }] },
    12: { title: "Sri Lankan Economy Post-Independence", sections: [{ title: "Overview", type: "text", content: "Topics include agricultural colonisation, import substitution era (1948-1977), liberalisation reforms (1977), civil war impact, and the recent 2022 sovereign debt crisis." }] }
  },
  business: {
    1: {
      title: "Basis of Business & Environment",
      sections: [
        {
          title: "Primary Purpose of Business",
          type: "text",
          content: "Businesses exist to produce goods and services that satisfy human needs and wants. Needs are basic survival requirements (e.g. water, shelter), while wants are specific ways of fulfilling needs, influenced by culture and marketing.\n\nIndustrial Sectors:\n- Primary: Extraction of natural resources (e.g., farming, mining).\n- Secondary: Processing resources into finished goods (e.g., manufacturing, building).\n- Tertiary: Providing services (e.g., tourism, banking, retail)."
        },
        {
          title: "Business Stakeholders",
          type: "text",
          content: "Stakeholders are any individuals or groups affected by or having an interest in a business's decisions and operations. They include:\n\n- Internal Stakeholders: Owners/Shareholders (seek dividends/capital growth), Employees (seek wages, job security, safety).\n- External Stakeholders: Customers (seek value, quality), Suppliers (seek reliable payments), Government (seeks tax, compliance), Community (seeks environment protection, jobs)."
        },
        {
          title: "PEST Analysis (External Macro-Environment)",
          type: "cards",
          items: [
            { label: "Political Factors", desc: "Government policies, tax laws, labor laws, stability." },
            { label: "Economic Factors", desc: "Inflation rates, interest rates, exchange rates, economic growth." },
            { label: "Social Factors", desc: "Demographic trends, lifestyle shifts, consumer tastes, cultural beliefs." },
            { label: "Technological Factors", desc: "Automation, research and development, internet adoption, software." }
          ]
        }
      ]
    },
    2: {
      title: "Social Responsibility & Business Ethics",
      sections: [
        {
          title: "Corporate Social Responsibility (CSR)",
          type: "text",
          content: "CSR refers to a business's voluntary commitment to act ethically and contribute to economic development while improving the quality of life of workers, the local community, and society at large. It goes beyond mere legal compliance."
        },
        {
          title: "The Triple Bottom Line",
          type: "cards",
          items: [
            { label: "People (Social)", desc: "Fair wages, employee safety, supporting local community projects." },
            { label: "Planet (Environmental)", desc: "Minimizing waste, reducing carbon footprint, ethical sourcing of raw materials." },
            { label: "Profit (Financial)", desc: "Achieving healthy returns to remain sustainable and reinvest in growth." }
          ]
        },
        {
          title: "Greenwashing",
          type: "text",
          content: "Greenwashing occurs when a business makes deceptive, false, or exaggerated claims about the environmental benefits of its products or practices to appear more eco-friendly than it actually is. It is considered highly unethical."
        }
      ]
    },
    3: {
      title: "Business-Government Relations & Consumer Protection",
      sections: [
        {
          title: "Government Influence on Businesses",
          type: "text",
          content: "The government influences businesses through three levels of administration:\n\n1. Central Government: National-level decision making, legislation & parliament, monetary & fiscal policy, national infrastructure.\n2. Provincial Councils: Provincial-level administration, regional development, provincial roads & services, business names charter.\n3. Local Authorities: Urban/Town/Municipal councils, local waste removal, building local markets, environmental policies."
        },
        {
          title: "Ways Government Interferes in Business",
          type: "cards",
          items: [
            { label: "Providing Infrastructure", desc: "Central: electricity. Provincial: roads. Local: waste & sanitation." },
            { label: "Being a Competitor", desc: "Central: govt TV channels. Provincial: direct businesses. Local: public markets." },
            { label: "Being a Customer", desc: "Central: buying paddy, Lak Sathosa. Provincial: defence procurement. Local: maintaining cemeteries." },
            { label: "Forming Policies", desc: "Central: monetary & fiscal policy. Provincial: business charter. Local: environmental policies." }
          ]
        },
        {
          title: "Economic Goals of Government",
          type: "cards",
          items: [
            { label: "Economic Growth", desc: "Continuous production growth + long-term human/social progress" },
            { label: "Full Employment", desc: "All willing labour and resources occupied effectively" },
            { label: "Fair Income Distribution", desc: "Equal distribution of total production among citizens" },
            { label: "Economic Stability", desc: "Internal (inflation control, stable prices) and external (exchange rate stability)" },
            { label: "Favourable International Trade", desc: "Protecting balance of payments" }
          ]
        },
        {
          title: "Fiscal Policy",
          type: "text",
          content: "Fiscal policy involves government revenue and expenditure.\n\nGovernment Revenue = Tax Revenue + Non-tax Revenue.\n\nTypes of taxes: Income tax (corporate, PAYE), VAT (on transactions), Excise duties (liquor, tobacco), Customs duties (imports), Other taxes.\n\nDirect Tax: Paid directly by the liable party (e.g. income tax). Cannot be transferred.\nIndirect Tax: Can be transferred to another party through prices (e.g. VAT, excise duties).\n\nGovernment Expenditure:\n- Recurrent: Salaries, interest payments, operational costs.\n- Capital: Roads, bridges, infrastructure projects."
        },
        {
          title: "Monetary Policy",
          type: "text",
          content: "Policy to control money supply in the economy. Executed by the Central Bank of Sri Lanka.\n\nMain aim: Price stability and inflation control.\n\nKey Instruments:\n1. Interest Rate (SDFR: paid on bank deposits, SLFR: charged on bank borrowings)\n2. Statutory Reserve Requirements (SRR): Deposits banks must maintain at the central bank. Lower SRR = higher money supply.\n3. Open Market Operations (OMO): Buying securities = higher money supply; selling = lower money supply.\n4. Changing Discount Rate: Controlling money supply through rate changes.\n5. Imposing Credit Limits: Quantitative (total credit volume) and Qualitative (loan direction).\n6. Managing Inactive Loans: Direct strategy to control loan portfolios."
        },
        {
          title: "Fiscal vs Monetary Policy",
          type: "comparison",
          leftTitle: "Fiscal Policy",
          leftItems: ["Government revenue & expenditure", "Managed by the government (Treasury)", "Uses taxation & spending", "Impacts budget deficits/surpluses"],
          rightTitle: "Monetary Policy",
          rightItems: ["Control of money supply", "Managed by Central Bank", "Uses interest rates, SRR, OMO", "Impacts inflation & credit availability"]
        },
        {
          title: "Consumer Protection",
          type: "text",
          content: "Legal cover ensuring customer satisfaction for the money paid.\n\nReasons for Consumer Protection: Abundance of goods creating confusion, increased competition needing fair practices, complex market, globalization, environmental awareness.\n\nBenefits: For consumers — value for money, protection from malpractices, health & safety, legal cover. For businesses — consumer trust & loyalty, increased profit, reduced waste."
        },
        {
          title: "Consumer Rights & Responsibilities",
          type: "comparison",
          leftTitle: "Consumer Rights",
          leftItems: ["Right to be Informed", "Right to Choose", "Right to be Heard", "Right to Safety", "Right to Basic Needs", "Right to Consumer Education", "Right to Healthy Environment", "Right to Redress"],
          rightTitle: "Consumer Responsibilities",
          rightItems: ["Critical Awareness", "Active Participation", "Social Concern", "Environmental Awareness", "Cooperation"]
        },
        {
          title: "Consumer Affairs Authority",
          type: "cards",
          items: [
            { label: "Goals", desc: "Protect from hazardous goods, prevent unfair trade, ensure competitive prices, enable redress" },
            { label: "Functions", desc: "Control restrictive trade, eliminate abuse of dominance, maintain competition, investigate practices" },
            { label: "Importance", desc: "Standards compliance, consumer trust, business image, minimized legal issues, fair competition" }
          ]
        },
        {
          title: "Sri Lanka Standards Institution",
          type: "cards",
          items: [
            { label: "Aims", desc: "Prepare national standards, promote quality control, examine compliance, issue SLS certification" },
            { label: "Functions", desc: "Formulate standards, award SLS mark, adopt ISO standards, conduct research" }
          ]
        }
      ]
    },
    4: {
      title: "Business Organizations",
      sections: [
        {
          title: "What is an Organization?",
          type: "text",
          content: "A social unit made up with a group of individuals joining together and having a common goal is an organization. Examples: School, Temple, Church, Shop.\n\nCommon Characteristics of a Formal Organization:\n- Has a goal\n- Involves individuals\n- Has an organizational structure\n\nBusiness organizations are enterprises engaged in production, distribution and selling of goods and services with the objective of earning profits or achieving social wellbeing."
        },
        {
          title: "Sole Proprietorship",
          type: "text",
          content: "Where the ownership of the business is held by a single individual. Examples: Chanuli Super Centre, Dasatha Book shop, Imalka saloon.\n\nKey Characteristics: Owner provides capital alone; all managerial decisions by owner; unlimited liability; not a legal entity; registration not compulsory; enjoys profits and losses alone; no continuity; accounting not compulsory.\n\nAdvantages: Easy to initiate, all profits belong to owner, independent decision making, fewer regulations, convenient termination.\n\nLimitations: Unlimited liability, problems raising additional capital, unsuccessful decisions by owner, no continuity, management becomes inconvenient with expansion.\n\nRegistration: If carried on in a name other than the owner's full name, registration is compulsory at the Provincial Business Name Registrar under the Business Name Ordinance No. 6 of 1918."
        },
        {
          title: "Partnership",
          type: "text",
          content: "Partnership Ordinance 1890: 'The relationship between the individuals who carry out a business with a profit motive is Partnership.' Examples: Gunawardena & Sons, Don Carolis & Sons.\n\nKey Features: Minimum 2 partners, maximum 20; agreement between partners; profit sharing agreement; every partner is an agent of themselves and other partners.\n\nPartnership Deed: Written agreement including business name, partner details, capital investment, profit/loss sharing, objectives, dissolution conditions.\n\nAdvantages: Easy to commence, can be dissolved easily, gather more capital, multiple skills and talents.\n\nLimitations: Unlimited liability, disagreements can adversely affect business, no continuity, all partners liable for conduct of a single partner."
        },
        {
          title: "Sole Proprietorship vs Partnership",
          type: "comparison",
          leftTitle: "Sole Proprietorship",
          leftItems: ["Single individual ownership", "Limited capital", "Independent decision making", "Unlimited liability", "No continuity", "Not a legal entity"],
          rightTitle: "Partnership",
          rightItems: ["Two or more individuals", "Higher capital", "Collective decision making", "Unlimited (joint & several)", "No continuity", "Not a legal entity"]
        },
        {
          title: "Company",
          type: "text",
          content: "A collection of individuals incorporated under the Companies Act No. 7 of 2007. Examples: Aralia Company Ltd, Pratheeba Company (Pvt.) Ltd.\n\nCharacteristics: Independent legal entity distinct from shareholders; continuous existence (perpetual succession); limited liability; capital through share issues; management by a Board of Directors.\n\nAdvantages: Ability to raise large capital, large-scale businesses, smart management team, attract investors, death of shareholder does not affect business.\n\nLimitations: Strict legal impacts, complicated establishment procedure, minority shareholders lack influence, double taxation (company + dividends), complicated dissolution.\n\nIncorporation: Register name, submit documents (application, articles of association, director/secretary consent), receive Certificate of Incorporation.\n\nTypes: Private Limited (min 1 / max 50 shareholders), Public Limited, Listed/Quoted, Unlisted/Unquoted, Offshore, Unlimited, Limited by Guarantee, Overseas."
        },
        {
          title: "Co-Operative Business",
          type: "cards",
          items: [
            { label: "Definition", desc: "Autonomous association of people united voluntarily to meet common economic, social and cultural needs through a jointly owned and democratically controlled enterprise." },
            { label: "Key Characteristics", desc: "Independent; voluntary membership; collective ownership; democratic control (one member one vote); share value unchanged (Rs. 100); surplus distributed per transaction value" },
            { label: "Principles (1995 ICA)", desc: "Voluntary membership, democratic control, member economic participation, autonomy, education, co-operation among co-ops, concern for community" },
            { label: "Benefits", desc: "10 people can initiate at low investment, democratic control, goods at reasonable prices, surplus distributed among members" },
            { label: "Limitations", desc: "Limited fundraising, restricted to co-op policies, limited hours, public sector interference, no credit sales" }
          ]
        },
        {
          title: "Franchise",
          type: "text",
          content: "A business model where one firm (the franchisor) assigns the authority of selling its goods/services to another (the franchisee) in a specific trade zone.\n\nFranchisor provides: Permission to use trade name, management training, marketing assistance, financial assistance, product supply & equipment.\n\nFranchisee must: Act per franchisor conditions, make capital investment, purchase only from authorized suppliers, make agreed payments.\n\nTypes: Product Franchise (e.g. IOC Fuel Stations), Manufacturing Franchise (e.g. Coca-Cola), Business Format Franchise (e.g. McDonalds, KFC).\n\nBenefits to Franchisee: Large market from goodwill, lower tendency to fail, convenient publicity, management training, financial support.\n\nLimitations for Franchisee: No perfect autonomy, greater cost to receive franchise, dependence on franchisor's goodwill."
        },
        {
          title: "Business Combinations",
          type: "cards",
          items: [
            { label: "Merger", desc: "Two or more companies convert into a single entity. One purchases assets/liabilities of another, or all terminate to form a new company." },
            { label: "Acquisition", desc: "One company purchases most ordinary share capital of another, gaining power of control." },
            { label: "Horizontal", desc: "Combination of businesses engaged in similar activities. E.g. two footwear manufacturers, DFCC Bank merger." },
            { label: "Vertical", desc: "Combination at different stages of the same process. E.g. shoe manufacturer + leather manufacturer + marketing company." },
            { label: "Conglomerate", desc: "Combination of businesses not in the same industry. E.g. shoe manufacturer + biscuit manufacturer." }
          ]
        },
        {
          title: "Public Sector",
          type: "cards",
          items: [
            { label: "State Corporation", desc: "Established under special act; full/major government ownership; board appointed by government. E.g. SLTB, Mahaweli Authority, SL Petroleum Corp." },
            { label: "Government Department", desc: "No separate legality; funds through annual budget. E.g. Education Dept, Health Dept, Railways." },
            { label: "State Company", desc: "Incorporated under Companies Act as PLC; >51% capital by state organizations. E.g. SL Telecom, Litro Gas." },
            { label: "Reasons for State Involvement", desc: "Control pricing, prevent monopolies, national defense, essential goods at reasonable prices, minimize resource wastage." }
          ]
        }
      ]
    },
    5: {
      title: "Entrepreneurship",
      sections: [
        {
          title: "What is Entrepreneurship?",
          type: "text",
          content: "Entrepreneurship is the process of extracting environmental opportunities creatively and generating innovation while bearing risks.\n\nKey Definitions:\n- William D. Bygrave: 'An entrepreneur is someone who perceives an opportunity and creates an organization to pursue it.'\n- Joseph Schumpeter: 'An entrepreneur is the person who destroys the existing economic order by introducing new products and services.'\n- ILO: 'Entrepreneurship is the ability to launch a new company and carry it on successfully.'"
        },
        {
          title: "Importance & Benefits of Entrepreneurship",
          type: "text",
          content: "Importance: Entrepreneurs find innovations and react to rapid changes; generate innovations to survive in competition; give leadership to the changing world; create employment through starting new businesses.\n\nIndividual Benefits: Make use of individual abilities, higher benefits through higher commitments, social status, self-satisfaction, personal and financial gains.\n\nInstitutional Benefits: Easy to face competition, expansion of business activities, continuous development, expansion of market shares.\n\nSocial & Economic Benefits: Creation of new employment, new goods and services, developing standard of living, using regional resources, development of new markets."
        },
        {
          title: "Trends in Entrepreneurship",
          type: "cards",
          items: [
            { label: "Global Entrepreneurship", desc: "Engaging in trade globally using technology, working beyond borders, understanding other cultures." },
            { label: "Social Entrepreneurship", desc: "Innovations to solve social problems with the intention of social service." },
            { label: "Green Entrepreneurship", desc: "Activities with positive environmental impact, protecting the environment as a core concept." },
            { label: "Intra Entrepreneurship", desc: "Creative people within organizations who introduce changes in products and production methods." }
          ]
        },
        {
          title: "Entrepreneurial Process",
          type: "text",
          content: "1. Discovery: Generate ideas, identify opportunities through environmental study, study the marketplace.\n2. Concept Development & Business Plan: Prepare a detailed program clarifying the business idea.\n3. Resourcing: Identify and acquire financial, human and physical resources.\n4. Actualization: Carry out operational activities, use resources to fulfil aims.\n5. Harvesting: Take decisions regarding future growth and development."
        },
        {
          title: "Entrepreneur vs Businessman",
          type: "comparison",
          leftTitle: "Entrepreneur",
          leftItems: ["Innovation & opportunity orientation", "High risk taker", "Creative, disruptive approach", "Focus on change & growth"],
          rightTitle: "Businessman",
          rightItems: ["Profit & operations orientation", "Calculated risk", "Systematic, established approach", "Focus on stability & efficiency"]
        },
        {
          title: "Entrepreneurial Characteristics & Skills",
          type: "cards",
          items: [
            { label: "Risk Taking", desc: "Faces risks rather than avoids them" },
            { label: "Creativity", desc: "Ability to see, think and take actions differently" },
            { label: "Commitment", desc: "Works with great enthusiasm until objectives achieved" },
            { label: "Self-confidence", desc: "Believes he can successfully overcome problems" },
            { label: "Leadership", desc: "Leads followers by encouraging them" },
            { label: "Communication", desc: "Maintains proper coordination" }
          ]
        },
        {
          title: "Small & Medium Scale Businesses",
          type: "text",
          content: "Characteristics: Having a small market, low invested capital, fewer staff, family labor used, owner is chief manager, targeted at local markets, fewer financial bonds.\n\nContribution to Economic Development: Labor intensive providing more employment, contribution to national product growth, utilizing inland resources, minimizing urbanization problems, minimizing income inequality, supplementing raw materials for large-scale businesses.\n\nReasons for Success: Sufficient infrastructure, financial and tax incentives, expanded market, sound management, enthusiasm and commitment.\n\nReasons for Failure: Financial problems, inability to face competition, weak management, less entrepreneurial skills, insufficient infrastructure."
        },
        {
          title: "Incentives for SMEs",
          type: "cards",
          items: [
            { label: "Financial Incentives", desc: "Short-term & long-term loans, financial assistance, tax concessions, refinancing facilities." },
            { label: "Non-Financial Incentives", desc: "Advisory services, entrepreneur development programs, research and technology services, infrastructure, awards." },
            { label: "Government Institutions", desc: "Industrial Development Board, Export Development Board, SL Standards Institution, National Development Bank." },
            { label: "Loan Projects", desc: "Liya Isura (interest-free for women), Suwana/SMILE (small industries), Shanya (ADB), Samurdhi/Divineguma, Sanasa loans." }
          ]
        }
      ]
    },
    6: {
      title: "Money and Financial Institutions",
      sections: [
        {
          title: "What is Money?",
          type: "text",
          content: "Anything that is generally accepted in exchange for goods and services is considered as money. Before money, the barter system was used — direct exchange of goods — which had many difficulties. Money emerged as a common medium of exchange acceptable to all.\n\nCharacteristics of a Good Currency: Having general recognition, durability, difficulty in imitation, easy movability, easy identifiability (homogeneity), ability to divide into small units (divisibility)."
        },
        {
          title: "Functions of Money",
          type: "cards",
          items: [
            { label: "Medium of Exchange", desc: "Intermediary in exchange of goods/services (e.g. buying a phone for Rs. 30,000)" },
            { label: "Standard of Value", desc: "Measuring the value of goods and services (e.g. price of shoes Rs. 1,999.90)" },
            { label: "Store of Value", desc: "Can be stored for future use without getting outdated (e.g. saving Rs. 10,000)" },
            { label: "Deferred Payment", desc: "Agreement for future payment (e.g. buy goods in Jan, pay in March)" }
          ]
        },
        {
          title: "Categories of Money",
          type: "cards",
          items: [
            { label: "Currency", desc: "Notes & coins issued on orders of financial authority. 100% liquidity." },
            { label: "Bank Money", desc: "Balances in demand/current accounts. Payments via cheques. High liquidity." },
            { label: "Near Money", desc: "Assets that store value, convertible to cash easily. Time deposits, savings deposits, Treasury bills." },
            { label: "E-Money", desc: "Money from digital technology. Debit cards, credit cards, pre-paid cards." }
          ]
        },
        {
          title: "Financial Institutions in Sri Lanka",
          type: "text",
          content: "Categories: Banking Sector (Central Bank, licensed commercial banks like BOC, Sampath, HNB, NSB), Deposit-taking Institutions (finance companies, Co-operative Rural Banks, SANASA), Specialized Institutions (leasing companies, primary dealers, share brokers, unit trusts), Contracted Savings (insurance companies, EPF, ETF, pension funds).\n\nHow they support businesses: Accepting deposits, providing loans, underwriting shares, leasing, management advisory, hire-purchase, pawning."
        },
        {
          title: "Central Bank of Sri Lanka",
          type: "text",
          content: "Established on 28th August 1950 under the Monetary Act No. 58 of 1949. Founder Governor: Mr. John Exter.\n\nTwo Main Objectives:\n1. Maintain economic and price stability — protect domestic currency value, avoid inflation/deflation.\n2. Maintain stability of the financial system — create security, identify and minimize threats.\n\nKey Activities: Manipulation of finance policies, exchange ratio policies, management of foreign reserves, issuing currency, supervisor of banks, financial agent of the government.\n\nPayment Systems: SLIPS (inter-bank, now LankaPay), SWIFT (universal interbank network), RTGS (high-value transfers), SSDS/LankaSecure (paperless securities), Lanka Settle System."
        },
        {
          title: "Commercial Banks",
          type: "cards",
          items: [
            { label: "Current Account", desc: "Cheque transactions, no interest, overdraft facility." },
            { label: "Savings Account", desc: "Interest on balance, flexible deposits/withdrawals." },
            { label: "Fixed Deposit", desc: "Fixed sum for fixed period, higher interest rate." },
            { label: "Overdraft", desc: "Approval to issue cheques above balance. Temporary or permanent. Higher interest." },
            { label: "Loans", desc: "Business loans (short/medium/long term) and consumer loans." },
            { label: "Other Services", desc: "E-banking, pawning, safety lockers, foreign exchange, credit cards, money remittance, letters of credit." }
          ]
        },
        {
          title: "Cheques",
          type: "text",
          content: "A cheque is a written order issued by a bank current account holder (drawer) to the commercial bank (drawee) to pay the amount stated to the person named (payee) or bearer.\n\nTypes:\n- Bearer Cheque: 'Or Bearer' not cancelled. Can be transferred by handing over.\n- Order Cheque: 'Or Bearer' struck off. Requires endorsement to transfer.\n\nCrossing (two parallel lines): Improves safety. General crossing (with or without statements), Special crossing (bank named), 'Not Negotiable', 'Account Payee Only'.\n\nDishonoring occurs when bank rejects payment due to: insufficient funds, drawer stops payment, drawer bankrupt, garnishee order (court), errors in writing, account closed."
        },
        {
          title: "Electronic Money",
          type: "comparison",
          leftTitle: "Advantages",
          leftItems: ["Minimized transaction costs", "Safety of cash", "24/7 transactions", "Convenient payments", "Various benefits & discounts", "Overseas usability"],
          rightTitle: "Disadvantages",
          rightItems: ["Interest and penalties on late payments", "Fraud risk", "Addiction to unnecessary consumption", "Technical interruptions", "Lack of knowledge for some users"]
        }
      ]
    },
    7: {
      title: "Insurance",
      sections: [
        {
          title: "Risk & Insurance",
          type: "text",
          content: "The space of occurring damage which can be estimated financially is known as a risk in insurance. Business risks include: fire, theft, business loss, damage to properties.\n\nInsurable Risks: Can be forecast, calculable in money terms, not certain (random), no connection to other insured loss, verifiable cause/place/time. E.g. fire, motor accidents, money in transit.\n\nNon-Insurable Risks: Business losses, natural reasons (depreciation, expiration), one's ability/strength (exam failure), design changes.\n\nInsurance is an agreement between the insurer and the insured whereby the insured pays the premium and the insurer pays compensation for insured risks."
        },
        {
          title: "Principles of Insurance",
          type: "cards",
          items: [
            { label: "Insurable Interest", desc: "Economic advantage from existence; disadvantage from loss. E.g. spouse has interest in each other's life." },
            { label: "Utmost Good Faith", desc: "Both parties reveal all information related to the agreement morally." },
            { label: "Indemnity", desc: "Payment of adequate compensation to restore the damaged property. Does NOT apply to life insurance." },
            { label: "Contribution", desc: "When insured in multiple companies, they pay proportionately." },
            { label: "Subrogation", desc: "After settling loss, insurer obtains other rights from external parties (e.g. insurer takes debris after total loss)." },
            { label: "Proximate Cause", desc: "Compensation paid only if the nearest reason is covered by the policy." }
          ]
        },
        {
          title: "Life Insurance vs Other Insurance",
          type: "comparison",
          leftTitle: "Life Insurance",
          leftItems: ["Risk is certain", "Indemnity principle NOT relevant", "Equal to a saving", "Policy cannot be transferred"],
          rightTitle: "Other Insurance",
          rightItems: ["Risk is uncertain", "Indemnity principle is relevant", "Compensation only when loss occurs", "Policy can be transferred"]
        },
        {
          title: "Types of General Insurance",
          type: "cards",
          items: [
            { label: "Fire Insurance", desc: "Covers losses from fire. Additional risks: riots, explosions, earthquakes, floods, storms, aircraft crashes (with extra premium)." },
            { label: "Theft & Burglary", desc: "Covers risks to business premises or homes from thievery." },
            { label: "Marine Insurance", desc: "Hull insurance (ship) and Cargo insurance (goods). Covers losses during sea transport." },
            { label: "Motor Traffic Insurance", desc: "Full insurance, Third Party Fire & Theft, or Minimum Third Party (legally required to drive)." },
            { label: "Liability Insurance", desc: "General, Product, Employer, Goods in Transit, and Money in Transit liability." },
            { label: "Goods & Money in Transit", desc: "Covers losses from loading to unloading during land transport. Essential for cash-heavy businesses." }
          ]
        },
        {
          title: "Motor Traffic Insurance Types",
          type: "comparison",
          leftTitle: "Full Insurance",
          leftItems: ["Covers loss to vehicle, people, and properties in the vehicle"],
          rightTitle: "Third Party Only",
          rightItems: ["Loss only to third party and properties. Minimum required to drive on the road."]
        },
        {
          title: "Reinsurance & Underwriting",
          type: "text",
          content: "Reinsurance: Insurer insures a risk it has undertaken under another insurance company.\n\nUnderwriting: Dividing a high-value risk among several insurance companies.\n\nNote: Insurable interest, utmost good faith, and proximate cause apply to life insurance. Indemnity, contribution, and subrogation do NOT apply to life insurance because loss of life is immeasurable."
        }
      ]
    },
    8: {
      title: "Communication",
      sections: [
        {
          title: "What is Communication?",
          type: "text",
          content: "Communication can be defined as sending and receiving information, understanding and sharing information from one party to another or many parties. Communication is important for business activities as well as social activities."
        },
        {
          title: "Importance of Communication",
          type: "comparison",
          leftTitle: "For Business Activities",
          leftItems: ["Exchange ideas between parties", "Maintain employer-employee relationship", "Manage human and physical resources", "Marketing promotional activities"],
          rightTitle: "For Social Activities",
          rightItems: ["Exchange ideas and messages socially", "Know instantly about international incidents", "Get information for educational activities", "Build social relationships nationally and internationally"]
        },
        {
          title: "Communication Process",
          type: "cards",
          items: [
            { label: "Sender", desc: "The party sending the message. Speaker/lecturer (verbal) or signer/institution (written)." },
            { label: "Message", desc: "The information the sender provides to the receiver." },
            { label: "Media", desc: "How information is provided. Verbal, written, signs & symbols." },
            { label: "Receiver", desc: "The person who grasps the message. Can be a reader, listener, or viewer." },
            { label: "Response", desc: "The way the receiver acts on what they heard or read." },
            { label: "Feedback", desc: "Response from receiver to sender confirming receipt and understanding." }
          ]
        },
        {
          title: "Effective Communication",
          type: "text",
          content: "Characteristics of Effective Communication: Correctness, Brevity, Completeness, Clarity, Politeness, Certainty, Consideration, Cost, Speed.\n\nKey Considerations for Preparing a Message: The nature of the message, completeness, correctness, politeness, ability of being understood by the receiver, brevity, certainty."
        },
        {
          title: "Communication Media",
          type: "cards",
          items: [
            { label: "Oral Media", desc: "Face-to-face conversations, telephone, meetings, speeches, presentations." },
            { label: "Written Media", desc: "Letters, memos, reports, emails, notices, minutes." },
            { label: "Signs & Symbols", desc: "Traffic signs, logos, gestures, facial expressions, body language." },
            { label: "Internal Communication", desc: "Among managers & owners, among employees, among departments." },
            { label: "External Communication", desc: "With customers, with other businesses & suppliers." }
          ]
        },
        {
          title: "Electronic Communication",
          type: "cards",
          items: [
            { label: "Internet", desc: "Computer network covering a wide range; network of networks." },
            { label: "E-mail", desc: "Exchange of messages through internet from computer to computer." },
            { label: "Intranet", desc: "Institutional network based on internet; data within the institute." },
            { label: "Fax", desc: "Transmits documents with pictures instantly through ordinary telephone system." },
            { label: "Voice Mail", desc: "Verbal message over phone stored on a disk to retrieve later." },
            { label: "Mobile Phones", desc: "Used for various business activities through satellite technology." }
          ]
        },
        {
          title: "Barriers & Strategies",
          type: "comparison",
          leftTitle: "Barriers",
          leftItems: ["Poor knowledge about modern technical methods", "External barriers in communication equipment", "Outdated communication systems", "Language problems, knowledge and attitudes", "Barriers in the external environment"],
          rightTitle: "Strategies to Overcome",
          rightItems: ["Use of modern communication equipment", "Imposing rules and regulations", "Setting up communication towers", "Use of digital technology", "Compilation of new rules on misuse"]
        },
        {
          title: "Advantages & Disadvantages by Media Type",
          type: "cards",
          items: [
            { label: "Verbal Advantages", desc: "Present problems in detail, provider and receiver become closer, fast and confidential." },
            { label: "Verbal Disadvantages", desc: "Language problems, problems with verbally weak parties, no proof of communication." },
            { label: "Written Advantages", desc: "Information in greater detail, can be used as proof, transmit data/tables/graphs easily." },
            { label: "Written Disadvantages", desc: "Difficulties in understanding, reading difficulties, information may distort in transmission." },
            { label: "Signs & Symbols Advantages", desc: "Brief and clear information, higher accuracy, easy to understand." },
            { label: "Signs & Symbols Disadvantages", desc: "Sight impairment problems, distortion over time, prior knowledge required." }
          ]
        }
      ]
    }
  },
  ict: {
    1: {
      title: "Data Representation",
      sections: [
        {
          title: "Number Systems",
          type: "cards",
          items: [
            { label: "Binary (Base-2)", desc: "Uses digits 0 and 1. Each digit is a bit. 8 bits = 1 byte." },
            { label: "Decimal (Base-10)", desc: "The everyday number system using digits 0-9." },
            { label: "Hexadecimal (Base-16)", desc: "Uses digits 0-9 and letters A-F. Each hex digit represents 4 bits." }
          ]
        },
        {
          title: "Character Encoding",
          type: "text",
          content: "ASCII (American Standard Code for Information Interchange) is a character encoding standard that assigns numeric codes to characters. Each ASCII character uses 7 bits (0-127). Extended ASCII uses 8 bits for 256 characters.\n\nUnicode is a more comprehensive encoding standard supporting characters from all writing systems worldwide. UTF-8 is the most common Unicode implementation."
        },
        {
          title: "Binary Arithmetic",
          type: "text",
          content: "Binary addition follows simple rules:\n- 0 + 0 = 0\n- 0 + 1 = 1\n- 1 + 0 = 1\n- 1 + 1 = 0 (carry 1)\n\nExample: 1010 (10) + 0110 (6) = 10000 (16)"
        }
      ]
    },
    2: {
      title: "Data Transmission",
      sections: [
        {
          title: "Transmission Methods",
          type: "comparison",
          leftTitle: "Serial Transmission",
          leftItems: ["Data sent one bit at a time", "Single communication channel", "Better for long distances", "Less interference", "Slower but more reliable"],
          rightTitle: "Parallel Transmission",
          rightItems: ["Multiple bits sent simultaneously", "Multiple channels", "Best for short distances", "Signal interference risk", "Faster over short distances"]
        },
        {
          title: "Transmission Modes",
          type: "cards",
          items: [
            { label: "Simplex", desc: "Data flows in only one direction (e.g., TV broadcast)." },
            { label: "Half-duplex", desc: "Data flows both ways but only one direction at a time (e.g., walkie-talkie)." },
            { label: "Full-duplex", desc: "Data flows both ways simultaneously (e.g., telephone call)." }
          ]
        },
        {
          title: "Error Detection",
          type: "text",
          content: "Parity Check: An extra bit (parity bit) is added to ensure the total number of 1-bits is even (even parity) or odd (odd parity). If a single bit is flipped during transmission, the parity will be wrong and the error is detected.\n\nChecksum: A calculated value sent with the data. The receiver recalculates the checksum and compares it to detect errors."
        }
      ]
    },
    3: {
      title: "Hardware",
      sections: [
        {
          title: "Internal Components",
          type: "cards",
          items: [
            { label: "CPU", desc: "Central Processing Unit — executes instructions, performs calculations. The 'brain' of the computer." },
            { label: "RAM", desc: "Random Access Memory — volatile memory that temporarily stores active data and programs." },
            { label: "ROM", desc: "Read-Only Memory — non-volatile memory that stores firmware (BIOS/UEFI)." },
            { label: "Motherboard", desc: "Main circuit board connecting all components." }
          ]
        },
        {
          title: "Storage Devices",
          type: "comparison",
          leftTitle: "HDD (Hard Disk Drive)",
          leftItems: ["Magnetic spinning disks", "Moving parts (slower, less durable)", "Higher capacity per dollar", "More mechanical failure risk"],
          rightTitle: "SSD (Solid State Drive)",
          rightItems: ["Flash memory chips", "No moving parts (faster, durable)", "Lower capacity per dollar", "More resistant to physical shock"]
        },
        {
          title: "Input & Output Devices",
          type: "text",
          content: "Input devices send data to the computer: keyboard, mouse, microphone, scanner, webcam.\n\nOutput devices display or produce results: monitor, printer, speakers, headphones.\n\nStorage devices store data: HDD, SSD, USB flash drive, memory card."
        }
      ]
    },
    4: {
      title: "Software",
      sections: [
        {
          title: "System Software vs Application Software",
          type: "comparison",
          leftTitle: "System Software",
          leftItems: ["Operating systems (Windows, macOS, Linux)", "Utility programs (antivirus, disk tools)", "Device drivers", "Manages hardware resources"],
          rightTitle: "Application Software",
          rightItems: ["Word processors, spreadsheets", "Web browsers, media players", "Games, design tools", "Serves specific user needs"]
        },
        {
          title: "Types of Software Licenses",
          type: "cards",
          items: [
            { label: "Proprietary", desc: "Owned by a company. Source code is hidden. Limited modification rights." },
            { label: "Open Source", desc: "Source code freely available. Can be modified and redistributed (e.g., Linux, Firefox)." },
            { label: "Freeware", desc: "Free to use but source code may not be available." },
            { label: "Shareware", desc: "Free trial with limited features; payment required for full version." }
          ]
        }
      ]
    },
    5: {
      title: "Networks",
      sections: [
        {
          title: "Network Types",
          type: "cards",
          items: [
            { label: "LAN (Local Area Network)", desc: "Connects devices in a small area like a home, school, or office building." },
            { label: "WAN (Wide Area Network)", desc: "Connects networks across large geographic areas (e.g., the internet is the largest WAN)." },
            { label: "PAN (Personal Area Network)", desc: "Connects personal devices within a few meters (e.g., Bluetooth)." }
          ]
        },
        {
          title: "Network Topologies",
          type: "text",
          content: "Star Topology: All devices connect to a central hub/switch. Easy to manage but fails if central hub fails.\n\nBus Topology: All devices share a single backbone cable. Simple but a break brings down the entire network.\n\nRing Topology: Each device connects to two others forming a ring. Data travels in one direction. Failure of one device can disrupt the network.\n\nMesh Topology: Every device connects to every other device. Highly reliable but expensive and complex."
        },
        {
          title: "IP Addressing",
          type: "text",
          content: "An IP (Internet Protocol) address is a unique numerical identifier for a device on a network. IPv4 uses 32-bit addresses (e.g., 192.168.1.1). IPv6 uses 128-bit addresses to solve the address shortage problem.\n\nA router directs data packets between networks. DNS (Domain Name System) converts human-readable domain names (google.com) into IP addresses."
        }
      ]
    },
    6: {
      title: "Security and Ethics",
      sections: [
        {
          title: "Cybersecurity Threats",
          type: "cards",
          items: [
            { label: "Malware", desc: "Malicious software including viruses, worms, Trojans, and ransomware." },
            { label: "Phishing", desc: "Deceptive messages tricking users into revealing passwords or personal data." },
            { label: "DoS/DDoS", desc: "Denial of Service attacks overload a server to make it unavailable." },
            { label: "Man-in-the-Middle", desc: "Attacker intercepts communication between two parties." }
          ]
        },
        {
          title: "Protection Methods",
          type: "text",
          content: "Encryption: Scrambles data using algorithms and keys so only authorized parties can read it. Common encryption types include symmetric (same key for encrypt/decrypt) and asymmetric (public/private key pair).\n\nAuthentication: Verifying user identity through factors:\n- Something you know (password)\n- Something you have (phone, security key)\n- Something you are (fingerprint, face)\n\nTwo-factor authentication (2FA) combines two different factors for stronger security."
        }
      ]
    },
    7: {
      title: "Databases",
      sections: [
        {
          title: "Relational Databases",
          type: "text",
          content: "A relational database organizes data into tables (relations). Each table has rows (records) and columns (fields). Tables can be linked through common fields using keys.\n\nBenefits of relational databases:\n- Data consistency through normalization\n- Relationships between data entities\n- Powerful querying via SQL\n- Data integrity through constraints"
        },
        {
          title: "Key Concepts",
          type: "cards",
          items: [
            { label: "Primary Key", desc: "A field that uniquely identifies each record in a table (e.g., student_id)." },
            { label: "Foreign Key", desc: "A field in one table that references the primary key of another table, creating a relationship." },
            { label: "Index", desc: "A data structure that speeds up data retrieval operations." },
            { label: "Schema", desc: "The structure defining tables, fields, types, and relationships in a database." }
          ]
        },
        {
          title: "SQL Basics",
          type: "text",
          content: "SQL (Structured Query Language) is used to manage relational databases.\n\nCommon commands:\n- SELECT: Retrieves data (e.g., SELECT * FROM students WHERE grade = 'A')\n- INSERT: Adds new records\n- UPDATE: Modifies existing records\n- DELETE: Removes records\n- CREATE TABLE: Defines a new table structure"
        }
      ]
    },
    8: {
      title: "Algorithms and Pseudocode",
      sections: [
        {
          title: "What is an Algorithm?",
          type: "text",
          content: "An algorithm is a finite sequence of well-defined, unambiguous steps to solve a specific problem. A good algorithm must:\n- Be precise and unambiguous\n- Terminate after a finite number of steps\n- Be general enough to handle all valid inputs\n- Be efficient in terms of time and space"
        },
        {
          title: "Flowchart Symbols",
          type: "cards",
          items: [
            { label: "Oval", desc: "Start/End — marks the beginning or end of an algorithm." },
            { label: "Rectangle", desc: "Process — represents an action or operation." },
            { label: "Diamond", desc: "Decision — a yes/no or true/false branch." },
            { label: "Parallelogram", desc: "Input/Output — reading data or displaying results." }
          ]
        },
        {
          title: "Searching & Sorting",
          type: "text",
          content: "Linear Search: Checks each element sequentially. O(n) time — works on unsorted data.\n\nBinary Search: Repeatedly divides a sorted list in half. O(log n) — very efficient but requires sorted data.\n\nBubble Sort: Compares and swaps adjacent elements. O(n²) — simple but inefficient for large datasets.\n\nQuick Sort: Divides data around a pivot. Average O(n log n) — one of the fastest general-purpose sorts."
        }
      ]
    },
    9: {
      title: "Programming Concepts",
      sections: [
        {
          title: "Variables and Data Types",
          type: "text",
          content: "A variable is a named location in memory that stores a value. Variables have a name, a type, and a value that can change during program execution.\n\nCommon data types:\n- Integer (int): Whole numbers — 42, -7, 0\n- Float: Decimal numbers — 3.14, -0.5\n- String (str): Text — \"Hello\", 'Python'\n- Boolean (bool): True or False\n\nOperators perform operations on values: arithmetic (+, -, *, /, %), comparison (==, !=, <, >), logical (AND, OR, NOT)."
        },
        {
          title: "Control Structures",
          type: "text",
          content: "Sequence: Instructions executed in order, one after another.\n\nSelection (Conditionals): Choose different paths based on conditions (if/else).\n\nIteration (Loops): Repeat a block of code multiple times (for/while loops).\n\nThese three structures form the foundation of all programming."
        }
      ]
    },
    10: {
      title: "Python — Basics",
      sections: [
        {
          title: "First Steps in Python",
          type: "text",
          content: "Python is a high-level, interpreted, dynamically typed programming language known for its readability and simplicity.\n\nDisplaying Output:\nThe print() function outputs text to the screen.\nExample:\nprint(\"Hello, World!\")\n\nVariable Naming Rules:\n- Must start with a letter or underscore.\n- Cannot start with a number.\n- Can only contain alphanumeric characters and underscores (A-z, 0-9, and _).\n- Variable names are case-sensitive (age, Age and AGE are three different variables)."
        },
        {
          title: "Input and Conversion",
          type: "text",
          content: "The input() function reads user input as a string. To use numeric input, convert it with int() or float().\n\nExample:\nage = int(input(\"Enter your age: \"))\nprint(\"Next year you will be\", age + 1)"
        },
        {
          title: "Conditionals and Loops",
          type: "text",
          content: "Conditionals: Python uses if, elif, and else for decision-making. Indentation defines code blocks.\n\nLoops:\n- for loop: Iterates over a sequence (list, range, string).\n- while loop: Repeats while a condition is true.\n- break: Exits the loop immediately.\n- continue: Skips to the next iteration."
        }
      ]
    },
    11: {
      title: "Python — Functions and Files",
      sections: [
        {
          title: "Functions",
          type: "text",
          content: "Functions are reusable blocks of code defined with the def keyword.\n\nExample:\ndef greet(name):\n    return \"Hello, \" + name + \"!\"\n\nFunctions can take parameters (inputs) and return values. They help organize code, avoid repetition, and enable reusability."
        },
        {
          title: "File Handling",
          type: "text",
          content: "Python can read from and write to files using the open() function.\n\nModes:\n- \"r\": Read (default)\n- \"w\": Write (overwrites existing content)\n- \"a\": Append (adds to end of file)\n- \"x\": Create (fails if file exists)\n\nExample:\nwith open(\"data.txt\", \"r\") as f:\n    content = f.read()\n\nThe 'with' statement automatically closes the file when done."
        },
        {
          title: "Modules",
          type: "text",
          content: "A module is a .py file containing functions, classes, and variables that can be imported into other Python programs.\n\nStandard library modules include math, random, datetime, os, and json.\n\nExample:\nimport math\nprint(math.sqrt(16))  # 4.0\n\nYou can also import specific functions: from math import sqrt"
        }
      ]
    },
    12: {
      title: "Web Technologies",
      sections: [
        {
          title: "HTML (Structure)",
          type: "text",
          content: "HTML (HyperText Markup Language) uses tags to structure web content. Key concepts:\n\n- Elements: <h1> to <h6> for headings, <p> for paragraphs, <a> for links, <img> for images\n- Attributes: Additional properties like href, src, class, id\n- Forms: <form>, <input>, <button> for user input\n- Semantic tags: <header>, <nav>, <main>, <section>, <article>, <footer>"
        },
        {
          title: "CSS (Style)",
          type: "text",
          content: "CSS (Cascading Style Sheets) controls the visual presentation of HTML elements.\n\nThree ways to apply CSS:\n- Inline: style attribute on HTML elements\n- Internal: <style> block in the <head>\n- External: .css file linked via <link>\n\nKey properties: color, background, font-size, margin, padding, display, flex, grid."
        },
        {
          title: "JavaScript (Behavior)",
          type: "text",
          content: "JavaScript adds interactivity and dynamic behavior to web pages.\n\nKey features:\n- Manipulates the DOM (Document Object Model)\n- Responds to events (clicks, form submissions)\n- Communicates with servers (fetch API, AJAX)\n- Runs in the browser or on servers (Node.js)"
        }
      ]
    }
  }
};

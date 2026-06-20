# Quiz Engine Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder quiz data with full 8-question sets and add an end-of-quiz review screen with pass/fail UX.

**Architecture:** Data-only changes in `nexoData.js` (no schema change) + logic changes in `QuizScreen.js` (new review screen component, pass/fail messaging). No changes to AppContext or other screens.

**Tech Stack:** React Native, React Context, Ionicons

---

### Task 1: Fill placeholder quiz data — Economics 3-12

**Files:**
- Modify: `src/constants/nexoData.js` lines 163-173

Replace the 1-question placeholders for economics lessons 3-12 with real 8-question sets.

- [ ] **Step 1: Edit economics lesson 3 (Government Intervention)**

```js
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
```

- [ ] **Step 2: Edit economics lesson 4 (Production, Cost & Market Structures)**

```js
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
```

- [ ] **Step 3: Edit economics lesson 5 (National Accounting)**

```js
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
```

- [ ] **Step 4: Edit economics lesson 6 (Macroeconomic Concepts)**

```js
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
```

- [ ] **Step 5: Edit economics lesson 7 (Price, Inflation, Money & Financial System)**

```js
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
```

- [ ] **Step 6: Edit economics lesson 8 (Market Failure, Government & Public Finance)**

```js
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
```

- [ ] **Step 7: Edit economics lesson 9 (Protectionism & Foreign Investments)**

```js
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
```

- [ ] **Step 8: Edit economics lesson 10 (Foreign Exchange & Balance of Payments)**

```js
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
```

- [ ] **Step 9: Edit economics lesson 11 (Economic Growth, Development & Labour)**

```js
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
```

- [ ] **Step 10: Edit economics lesson 12 (Sri Lankan Economy Post-Independence)**

```js
    12: [
      {q:'At independence in 1948, Sri Lanka\'s economy was primarily:', options:['Industrial','Agricultural with plantation crops (tea, rubber, coconut)','Technology-based','Oil-exporting'], answer:1, explain:'The colonial economy was dominated by plantation agriculture — tea, rubber, and coconut — which continued after independence.'},
      {q:'The 1977 economic reforms shifted Sri Lanka from:', options:['A market economy to a command economy','Import substitution to export-oriented liberalization','Agriculture to industry','Socialism to communism'], answer:1, explain:'The 1977 UNP government shifted from protectionist import-substitution to an open, export-oriented economy with trade liberalization.'},
      {q:'Which of the following was part of the 1977 liberalization?', options:['Nationalizing plantations','Removing price controls and opening to foreign investment','Introducing central planning','Closing the stock exchange'], answer:1, explain:'Reforms included: removing price controls, liberalizing trade, opening to FDI, floating the rupee, and promoting export processing zones.'},
      {q:'The civil war (1983-2009) affected the economy by:', options:['Boosting tourism','Reducing FDI and diverting resources to military spending','Increasing agricultural exports','Lowering government debt'], answer:1, explain:'The conflict reduced foreign investment, damaged infrastructure, diverted government spending to defense, and disrupted economic activity in the north/east.'},
      {q:'Sri Lanka\'s major export earner after independence shifted from coffee to:', options:['Rubber','Tea','Textiles','Coconut'], answer:1, explain:'Coffee cultivation collapsed due to disease in the 1870s and was replaced by tea, which became Sri Lanka\'s dominant plantation export.'},
      {q:'The Mahaweli Development Programme aimed to:', options:['Build highways','Develop irrigation and hydropower through river diversion','Establish industrial zones','Promote tourism'], answer:1, explain:'The Mahaweli Programme (1970s onward) was Sri Lanka\'s largest development project, diverting the Mahaweli River for irrigation and hydroelectricity.'},
      {q:'In recent years, Sri Lanka\'s economy has faced challenges from:', options:['Oil abundance','High debt levels, fiscal deficits, and external imbalances','Trade surpluses','Rapid industrialization'], answer:1, explain:'Sri Lanka has faced chronic fiscal deficits, high public debt, low foreign reserves, and balance of payments pressures — culminating in the 2022 economic crisis.'},
      {q:'The 2022 economic crisis in Sri Lanka was triggered by:', options:['Oil price collapse','Foreign exchange shortages, debt distress, and policy missteps','Agricultural boom','Stock market crash'], answer:1, explain:'The crisis resulted from depleted foreign reserves, inability to pay import bills (fuel, food, medicine), unsustainable debt, and tourism collapse from COVID-19.'}
    ],
```

- [ ] **Step 11: Verify the edit was applied correctly**

Run: `grep -q "lessons 3-12.*placeholder" src/constants/nexoData.js && echo "FAIL: placeholders remain" || echo "PASS: economics 3-12 replaced"`

---

### Task 2: Fill placeholder quiz data — Business 3-8

**Files:**
- Modify: `src/constants/nexoData.js` lines 196-202

Replace the 1-question placeholders for business lessons 3-8 with real 8-question sets.

- [ ] **Step 1: Edit business lesson 3 (Business-Government Relations & Consumer Protection)**

```js
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
```

- [ ] **Step 2: Edit business lesson 4 (Business Organizations)**

```js
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
```

- [ ] **Step 3: Edit business lesson 5 (Entrepreneurship)**

```js
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
```

- [ ] **Step 4: Edit business lesson 6 (Money and Financial Institutions)**

```js
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
```

- [ ] **Step 5: Edit business lesson 7 (Insurance)**

```js
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
```

- [ ] **Step 6: Edit business lesson 8 (Communication)**

```js
    8: [
      {q:'Business communication is defined as:', options:['Only written messages','The sharing of information within and outside an organization for commercial benefit','Face-to-face conversations only','Sending emails'], answer:1, explain:'Business communication encompasses all information exchange (internal and external) that supports business operations and relationships.'},
      {q:'Which is an example of formal internal communication?', options:['Office gossip','A memorandum from management to staff','A WhatsApp group chat','Personal phone calls'], answer:1, explain:'A memo is a formal written message used for official internal communication within an organization.'},
      {q:'The communication process requires:', options:['Only a sender','A sender, message, channel, receiver, and feedback','Only a message','A computer'], answer:1, explain:'Effective communication requires a sender who encodes a message, transmits via a channel, and a receiver who decodes it and provides feedback.'},
      {q:'A key barrier to effective communication is:', options:['Clear language','Active listening','Semantic noise (jargon, ambiguous words)','Simple structure'], answer:2, explain:'Semantic noise — unclear language, jargon, or ambiguous terms — interferes with the receiver understanding the message.'},
      {q:'Non-verbal communication includes:', options:['Only written words','Body language, facial expressions, gestures, and tone of voice','Emails and reports','Telephone calls'], answer:1, explain:'Non-verbal communication conveys meaning without words — through posture, eye contact, gestures, and vocal tone.'},
      {q:'A downward communication flow moves from:', options:['Employees to managers','Managers to subordinates','Peers to peers','Customers to the company'], answer:1, explain:'Downward communication flows from higher to lower levels in the hierarchy (e.g., manager to employee instructions).'},
      {q:'Grapevine communication is:', options:['Official company announcements','Informal, unofficial communication through social networks','Government communications','Written memos'], answer:1, explain:'The grapevine is the informal communication network within an organization — rumors, gossip, and unofficial information sharing.'},
      {q:'Effective business writing should be:', options:['Complex and jargon-filled','Clear, concise, and audience-appropriate','As long as possible','Written in very small font'], answer:1, explain:'Good business writing prioritizes clarity, conciseness, accuracy, and adapting to the audience\'s needs.'}
    ],
```

- [ ] **Step 7: Verify the edit**

Run: `grep -q "Placeholders" src/constants/nexoData.js && echo "FAIL: some placeholders remain" || echo "PASS: all placeholders removed"`

---

### Task 3: Add review screen and pass/fail UX to QuizScreen

**Files:**
- Modify: `src/screens/QuizScreen.js` — add review mode, pass/fail threshold, answer tracking

- [ ] **Step 1: Add new state variables**

Add to the existing `useState` calls:
```js
const [reviewMode, setReviewMode] = useState(false);
const [answers, setAnswers] = useState([]);
```

Insert after line 32 (`const [quizFinished, setQuizFinished] = useState(false);`):
```js
const [reviewMode, setReviewMode] = useState(false);
const [answers, setAnswers] = useState([]);
```

- [ ] **Step 2: Modify `handleOptionSelect` to record answers**

In the existing `handleOptionSelect`, after `setAnswered(true)` and `setSelectedOpt(optIndex)`, add:
```js
setAnswers(prev => [...prev, { selected: optIndex, isCorrect: optIndex === currentQ.answer }]);
```

Insert after line 42 (`setAnswered(true);`). The full function becomes:
```js
const handleOptionSelect = (optIndex) => {
  if (answered) return;

  setAnswered(true);
  setSelectedOpt(optIndex);
  setAnswers(prev => [...prev, { selected: optIndex, isCorrect: optIndex === currentQ.answer }]);

  const isCorrect = optIndex === currentQ.answer;
  if (isCorrect) {
    setScore(prev => prev + 1);
    triggerHaptic('success');
  } else {
    triggerHaptic('error');
  }
};
```

- [ ] **Step 3: Modify `handleNext` to go to review instead of results**

Replace the existing `handleNext` function:
```js
const handleNext = () => {
  triggerHaptic('light');
  if (currentIdx < totalQuestions - 1) {
    setCurrentIdx(prev => prev + 1);
    setSelectedOpt(null);
    setAnswered(false);
  } else {
    setReviewMode(true);
  }
};
```

- [ ] **Step 4: Add review screen JSX**

Insert before the `if (quizFinished)` block (after line 84, before `if (quizFinished)`). This is a new screen shown between the quiz and results.

```js
if (reviewMode) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerBreadcrumb} numberOfLines={1}>Quiz Review</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{currentIdx + 1} Questions</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.reviewContent} showsVerticalScrollIndicator={false}>
        {questions.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          return (
            <View key={qIdx} style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <View style={[styles.reviewStatusBadge, {
                  backgroundColor: userAnswer?.isCorrect ? 'rgba(76, 217, 107, 0.15)' : 'rgba(212, 96, 106, 0.15)',
                  borderColor: userAnswer?.isCorrect ? '#4cd96b' : '#d4606a',
                }]}>
                  <Ionicons
                    name={userAnswer?.isCorrect ? 'checkmark-circle' : 'close-circle'}
                    size={16}
                    color={userAnswer?.isCorrect ? '#4cd96b' : '#d4606a'}
                  />
                </View>
                <Text style={styles.reviewQNum}>Q{qIdx + 1}</Text>
              </View>

              <Text style={styles.reviewQText}>{q.q}</Text>

              <View style={styles.reviewOptions}>
                {q.options.map((opt, oIdx) => {
                  const isUserAnswer = userAnswer?.selected === oIdx;
                  const isCorrectAnswer = oIdx === q.answer;
                  let optBoxStyle = styles.reviewOpt;
                  let optTextStyle = styles.reviewOptText;
                  let optLabelStyle = styles.reviewOptLabel;

                  if (isCorrectAnswer) {
                    optBoxStyle = [styles.reviewOpt, styles.reviewOptCorrect];
                    optTextStyle = [styles.reviewOptText, styles.reviewOptTextCorrect];
                    optLabelStyle = [styles.reviewOptLabel, styles.reviewOptLabelCorrect];
                  } else if (isUserAnswer) {
                    optBoxStyle = [styles.reviewOpt, styles.reviewOptWrong];
                    optTextStyle = [styles.reviewOptText, styles.reviewOptTextWrong];
                    optLabelStyle = [styles.reviewOptLabel, styles.reviewOptLabelWrong];
                  }

                  const optionLabel = ['A', 'B', 'C', 'D'][oIdx];

                  return (
                    <View key={oIdx} style={optBoxStyle}>
                      <View style={optLabelStyle}>
                        <Text style={styles.reviewOptLabelContent}>{optionLabel}</Text>
                      </View>
                      <Text style={optTextStyle}>{opt}</Text>
                    </View>
                  );
                })}
              </View>

              {q.explain && (
                <View style={styles.reviewExplain}>
                  <Text style={styles.reviewExplainTitle}>Explanation</Text>
                  <Text style={styles.reviewExplainText}>{q.explain}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            triggerHaptic('light');
            saveQuizScore(subjectId, lessonId, score, totalQuestions);
            setQuizFinished(true);
          }}
        >
          <Text style={styles.nextBtnText}>See Results</Text>
          <Ionicons name="arrow-forward" size={18} color="#080b12" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
```

- [ ] **Step 5: Add review screen and pass/fail styles**

Add to the existing `StyleSheet.create({...})`:
```js
reviewContent: {
    padding: 16,
    paddingBottom: 100,
  },
  reviewCard: {
    backgroundColor: '#111625',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewStatusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  reviewQNum: {
    color: '#90b090',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reviewQText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewOptions: {
    marginBottom: 12,
  },
  reviewOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#080b12',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  reviewOptCorrect: {
    backgroundColor: 'rgba(76, 217, 107, 0.08)',
    borderColor: '#4cd96b',
  },
  reviewOptWrong: {
    backgroundColor: 'rgba(212, 96, 106, 0.08)',
    borderColor: '#d4606a',
  },
  reviewOptLabel: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewOptLabelContent: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  reviewOptLabelCorrect: {
    backgroundColor: '#4cd96b',
  },
  reviewOptLabelWrong: {
    backgroundColor: '#d4606a',
  },
  reviewOptText: {
    color: '#90b090',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  reviewOptTextCorrect: {
    color: '#ffffff',
  },
  reviewOptTextWrong: {
    color: '#ffffff',
  },
  reviewExplain: {
    backgroundColor: 'rgba(42, 175, 143, 0.06)',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(42, 175, 143, 0.15)',
  },
  reviewExplainTitle: {
    color: '#2aaf8f',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  reviewExplainText: {
    color: '#90b090',
    fontSize: 12,
    lineHeight: 17,
  },
```

Insert after the existing `closeBtnText` style block (before the closing `});`).

- [ ] **Step 6: Update results screen pass/fail messaging**

Modify `getResultsFeedback()` to return pass/fail labels:
```js
const getResultsFeedback = () => {
  const pct = score / totalQuestions;
  if (pct >= 0.6) return { label: 'You passed! Great work on this quiz.', color: '#4cd96b' };
  return { label: 'Review the lesson notes and retake the quiz to improve your score.', color: '#d4a040' };
};
```

Replace the existing function (lines 75-81).

- [ ] **Step 7: Update results screen "Close" button label**

Change from `<Text style={styles.closeBtnText}>Close</Text>` to:
```js
<Text style={styles.closeBtnText}>Back to Lesson</Text>
```

- [ ] **Step 8: Remove `answered` and `next` text conditional on last question**

Change the "See Results" text on the footer button (line 219) from:
```js
{currentIdx === totalQuestions - 1 ? 'See Results' : 'Next Question'}
```
to:
```js
{currentIdx === totalQuestions - 1 ? 'Review Answers' : 'Next Question'}
```

- [ ] **Step 9: Verify the build**

Run: `npx expo export --platform web --output-dir /tmp/nexo-phase5-verify 2>&1 | tail -5`
Expected: `Exported: /tmp/nexo-phase5-verify` with no errors.

---

### Task 4: Update anchored summary

- [ ] **Step 1: Write updated summary**

Update the `AGENTS.md` or anchored summary to reflect Phase 5 completion: new quiz data for all 16 lessons, review screen, pass/fail UX.

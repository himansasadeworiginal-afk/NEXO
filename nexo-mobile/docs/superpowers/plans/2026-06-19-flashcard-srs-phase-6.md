# Flashcard SRS Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task.

**Goal:** Replace placeholder flashcard decks with real content, add SRS scheduling (3-tier delay), and add swipe gesture UX.

**Architecture:** All data embedded in `nexoData.js`, SRS state in `AppContext.js` persisted via AsyncStorage, swipe UX via React Native `PanResponder` (no new dependency). Three independent tasks: data fill → SRS state → UI rewrite.

**Tech Stack:** React Native (Expo), PanResponder, AsyncStorage

---

### Task 1: Fill Flashcard Data (economics 3-12, business 3-8)

**Files:**
- Modify: `src/constants/nexoData.js:458-492` (16 placeholder entries → full decks)

Replace each single-card placeholder entry with 6 real flashcards. The existing lessons 1-2 in each subject serve as the style reference: question-answer format, `{ front, back }` schema, no trailing commas between entries in the same array. Content mirrors the lesson topics from `SUBJECTS_DATA` descriptions.

**Edits to make:**

**Line 458-468: Replace economics placeholders**

Replace:
```js
    // Placeholders
    3: [{ front:'What is a price ceiling?', back:'A government-imposed maximum price below equilibrium, intended to make essential goods affordable.' }],
    4: [{ front:'What are economies of scale?', back:'Cost advantages that firms experience when production increases — average cost falls as output rises.' }],
    5: [{ front:'What is GDP?', back:'Gross Domestic Product — the total monetary value of all final goods and services produced within a country.' }],
    6: [{ front:'What is aggregate demand?', back:'The total spending on goods and services in an economy at a given price level.' }],
    7: [{ front:'What is monetary policy?', back:'Actions by a central bank to control money supply, interest rates, and credit conditions.' }],
    8: [{ front:'What are externalities?', back:'Spillover effects of production or consumption that affect third parties not involved in the market transaction.' }],
    9: [{ front:'What is protectionism?', back:'Government policies that restrict international trade to protect domestic industries.' }],
    10: [{ front:'What is an exchange rate?', back:'The price of one currency expressed in terms of another currency.' }],
    11: [{ front:'What is economic growth?', back:'An increase in an economy\'s productive capacity, measured by real GDP growth.' }],
    12: [{ front:'What was the dominant export crop of colonial Ceylon?', back:'Coffee, later replaced by tea in the 1870s.' }]
```

With:
```js
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
```

**Line 486-492: Replace business placeholders**

Replace:
```js
    // Placeholders
    3: [{ front:'What is consumer protection?', back:'Laws and regulations designed to safeguard consumers from unfair or unsafe business practices.' }],
    4: [{ front:'What is limited liability?', back:'Shareholders are only liable for the company\'s debts up to the value of their shares.' }],
    5: [{ front:'What is a business plan?', back:'A document outlining business goals, strategies, market analysis, and financial projections.' }],
    6: [{ front:'What are the functions of money?', back:'Medium of exchange, store of value, unit of account, standard of deferred payment.' }],
    7: [{ front:'What is insurance?', back:'A contract where an insurer provides financial protection against specified risks in exchange for premiums.' }],
    8: [{ front:'What is business communication?', back:'The sharing of information within and outside an organization for commercial benefit.' }]
```

With:
```js
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
```

- [ ] **Step 1: Replace economics 3-12 placeholder entries** with the 6-card arrays above (edit lines 458-468)

- [ ] **Step 2: Replace business 3-8 placeholder entries** with the 6-card arrays above (edit lines 486-492)

- [ ] **Step 3: Verify data integrity**

Run: `node -e "const d = require('./src/constants/nexoData.js'); const f = d.FLASHCARDS_DATA; let total = 0; ['economics','business'].forEach(s => { Object.values(f[s]).forEach(c => { if (c.length < 5) console.log('WARN:', s, 'has', c.length, 'cards'); total += c.length; }); }); console.log('Total:', total, 'cards');"`

Expected: no warnings (all lessons have 5+ cards), total ≥ 200.

---

### Task 2: Add SRS State to AppContext

**Files:**
- Modify: `src/context/AppContext.js`

**State shape:**
```js
flashcardSrs: {
  'economics_3_0': { ease: 2, due: 1718760000000 },
  'economics_3_1': { ease: 0, due: null },
  ...
}
```
Key: `{subjectId}_{lessonId}_{cardIndex}` — Value: `{ ease: 0-2, due: <epoch ms> | null }`

- **ease 0** = rated Again (1 min delay), **ease 1** = rated Hard (30 min), **ease 2** = rated Easy (24h)
- **due = null** means card has never been reviewed (always due)
- **due ≤ Date.now()** means card is due for review

- [ ] **Step 1: Add flashcardSrs state variable**

After line 14 (`const [quizHighScores, setQuizHighScores] = useState({});`), add:
```js
const [flashcardSrs, setFlashcardSrs] = useState({});
```

- [ ] **Step 2: Load flashcardSrs on init**

Inside the `loadState` function, after the quiz scores loop (after line 54 `setQuizHighScores(quizzes);`), add:
```js
const storedFlashcardSrs = await storage.getItem('nexo_fc_srs');
if (storedFlashcardSrs) setFlashcardSrs(JSON.parse(storedFlashcardSrs));
```

- [ ] **Step 3: Add saveFlashcardRating function**

After the `saveQuizScore` function (after line 132 closing brace), add:
```js
const saveFlashcardRating = async (subjectId, lessonId, cardIdx, ease) => {
  const delays = [1 * 60 * 1000, 30 * 60 * 1000, 24 * 60 * 60 * 1000]; // again, hard, easy
  const key = `${subjectId}_${lessonId}_${cardIdx}`;
  const data = { ease, due: Date.now() + delays[ease] };
  const newSrs = { ...flashcardSrs, [key]: data };
  setFlashcardSrs(newSrs);
  await storage.setItem('nexo_fc_srs', JSON.stringify(newSrs));
};
```

- [ ] **Step 4: Expose flashcardSrs and saveFlashcardRating in context**

In the Provider value (line 234-254), add between `checkAndAwardBadges` and `loading`:
```js
flashcardSrs,
saveFlashcardRating,
```

- [ ] **Step 5: Add getDueFlashcards helper (static utility)**

This goes in the screen file (Task 3) not AppContext, since it's presentation logic. Skip this step — the filtering lives in FlashcardScreen.

---

### Task 3: Rewrite FlashcardScreen

**Files:**
- Rewrite: `src/screens/FlashcardScreen.js` (existing 450 lines → keep structure, add swipe + SRS)

**Changes to make:**

- [ ] **Step 1: Add PanResponder import**

Change line 4 `Animated` import to:
```js
  Animated,
  PanResponder,
  Dimensions
```

- [ ] **Step 2: Add new state variables**

After line 31 `const [finished, setFinished] = useState(false);`, add:
```js
  const [dueCards, setDueCards] = useState([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [noCardsDue, setNoCardsDue] = useState(false);
```

- [ ] **Step 3: Derive due cards on mount**

After the existing `cards` fallback (line 24-26), add a useEffect:
```js
  useEffect(() => {
    if (cards.length === 0 || !cards[0].front) {
      setNoCardsDue(true);
      return;
    }
    const now = Date.now();
    const due = cards
      .map((card, origIdx) => ({ ...card, _origIdx: origIdx }))
      .filter((_, idx) => {
        const key = `${subjectId}_${lessonId}_${idx}`;
        const srs = flashcardSrs[key];
        return !srs || !srs.due || srs.due <= now;
      });
    // Fisher-Yates shuffle
    for (let i = due.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [due[i], due[j]] = [due[j], due[i]];
    }
    if (due.length === 0) {
      setNoCardsDue(true);
    } else {
      setDueCards(due);
    }
  }, [cards.length]);
```

- [ ] **Step 4: Initialize currentIdx and finished based on dueCards**

Replace static card access — current card uses `dueCards[currentIdx]` instead of `cards[currentIdx]`.

- [ ] **Step 5: Add PanResponder for swipe**

After `flipAnim` ref (line 34), add:
```js
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isFlipped,
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 10 && !isFlipped,
      onPanResponderMove: (_, gs) => {
        if (!isFlipped) pan.setValue({ x: gs.dx, y: 0 });
      },
      onPanResponderRelease: (_, gs) => {
        if (Math.abs(gs.dx) > 80) {
          const ease = gs.dx > 0 ? 2 : 0; // swipe right = easy(2), left = again(0)
          Animated.timing(pan, {
            toValue: { x: gs.dx > 0 ? 500 : -500, y: 0 },
            duration: 200,
            useNativeDriver: true
          }).start(() => {
            handleRate(ease);
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true
          }).start();
        }
      }
    })
  ).current;
```

- [ ] **Step 6: Rename handleRate parameters**

Replace the `handleRate` function (lines 58-77) with:
```js
  const handleRate = (ease) => {
    let gained = 10;
    if (ease === 2) gained = 30;
    else if (ease === 1) gained = 15;

    triggerHaptic('medium');
    addXp(gained);
    setXpEarned(prev => prev + gained);
    saveFlashcardRating(subjectId, lessonId, dueCards[currentIdx]._origIdx || currentIdx, ease);

    flipAnim.setValue(0);
    setIsFlipped(false);

    if (currentIdx < dueCards.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setReviewedCount(prev => prev + 1);
    } else {
      setReviewedCount(prev => prev + 1);
      setFinished(true);
    }
  };
```

- [ ] **Step 7: Add no-cards-due early return**

Before the `if (finished)` block (line 97), add:
```js
  if (noCardsDue) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishedContainer}>
          <Ionicons name="checkmark-done-outline" size={80} color="#2aaf8f" style={{ marginBottom: 20 }} />
          <Text style={styles.finishedTitle}>All Caught Up!</Text>
          <Text style={styles.finishedSubtitle}>No flashcards due for this lesson right now. Come back later!</Text>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => { triggerHaptic('light'); navigation.goBack(); }}
          >
            <Text style={styles.closeBtnText}>Return to Lesson</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
```

- [ ] **Step 8: Update the finished screen**

Replace the finished screen (lines 97-129) to show reviewed count:
```js
  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.finishedContainer}>
          <Ionicons name="sparkles-outline" size={80} color="#4cd96b" style={{ marginBottom: 20 }} />
          <Text style={styles.finishedTitle}>All Done!</Text>
          <Text style={styles.finishedSubtitle}>{lesson.title}</Text>
          <View style={styles.statsCard}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>{reviewedCount}</Text>
              <Text style={styles.statLbl}>Cards Reviewed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>+{xpEarned}</Text>
              <Text style={styles.statLbl}>XP Earned</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => { triggerHaptic('light'); navigation.goBack(); }}
          >
            <Text style={styles.closeBtnText}>Return to Lesson</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
```

- [ ] **Step 9: Update card rendering to use dueCards**

Replace line 131 `const currentCard = cards[currentIdx];` with:
```js
  const currentCard = dueCards[currentIdx];
  if (!currentCard) return null;
```

- [ ] **Step 10: Wrap card in animated pan responder**

Replace the card area `<View style={styles.cardArea}>` (lines 156-192) with:
```jsx
      <View style={styles.cardArea} {...panResponder.panHandlers}>
        <Animated.View style={[{ transform: [{ translateX: pan.x }] }, styles.cardWrapper]}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.cardFull}
            onPress={handleFlip}
          >
            {/* FRONT SIDE */}
            <Animated.View style={[styles.cardSide, styles.cardFront, frontAnimatedStyle, {
              opacity: flipAnim.interpolate({
                inputRange: [89, 90],
                outputRange: [1, 0]
              })
            }]}>
              <Text style={[styles.cardType, { color: '#2aaf8f' }]}>CONCEPT / QUESTION</Text>
              <Text style={styles.cardContentText}>{currentCard.front}</Text>
              <View style={styles.flipPrompt}>
                <Ionicons name="swap-horizontal-outline" size={14} color="#90b090" style={{ marginRight: 6 }} />
                <Text style={styles.flipPromptText}>Tap to reveal answer</Text>
              </View>
            </Animated.View>

            {/* BACK SIDE */}
            <Animated.View style={[styles.cardSide, styles.cardBack, backAnimatedStyle, {
              opacity: flipAnim.interpolate({
                inputRange: [89, 90],
                outputRange: [0, 1]
              })
            }]}>
              <Text style={[styles.cardType, { color: '#4cd96b' }]}>DEFINITION / ANSWER</Text>
              <Text style={styles.cardContentText}>{currentCard.back}</Text>
              <View style={styles.flipPrompt}>
                <Ionicons name="swap-horizontal-outline" size={14} color="#90b090" style={{ marginRight: 6 }} />
                <Text style={styles.flipPromptText}>Tap to flip back</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
```

- [ ] **Step 11: Update counter badge and header text**

Line 151: change `{currentIdx + 1}/{cards.length}` to `{currentIdx + 1}/{dueCards.length}`

- [ ] **Step 12: Rename buttons to Again/Hard/Easy**

Replace the footer buttons (lines 196-229) with:
```jsx
      <View style={styles.footer}>
        {isFlipped ? (
          <View style={styles.srsRow}>
            <TouchableOpacity
              style={[styles.srsBtn, styles.srsHard]}
              onPress={() => handleRate(0)}
            >
              <Text style={styles.srsBtnText}>Again</Text>
              <Text style={styles.srsXpText}>+10 XP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.srsBtn, styles.srsMedium]}
              onPress={() => handleRate(1)}
            >
              <Text style={styles.srsBtnText}>Hard</Text>
              <Text style={styles.srsXpText}>+15 XP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.srsBtn, styles.srsEasy]}
              onPress={() => handleRate(2)}
            >
              <Text style={styles.srsBtnText}>Easy</Text>
              <Text style={styles.srsXpText}>+30 XP</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.tapToRevealBtn}
            onPress={handleFlip}
          >
            <Text style={styles.tapToRevealText}>Tap to Reveal</Text>
          </TouchableOpacity>
        )}
      </View>
```

- [ ] **Step 13: Add cardFull style**

Before the closing `});` of StyleSheet, add:
```js
  cardFull: {
    width: '100%',
    height: '100%',
  },
```

- [ ] **Step 14: Update imports to include useContext dependencies**

Update the import line 1 to:
```js
import React, { useContext, useState, useRef, useEffect } from 'react';
```

And verify FlashcardScreen destructures `saveFlashcardRating` from AppContext:
```js
const { addXp, triggerHaptic, saveFlashcardRating, flashcardSrs } = useContext(AppContext);
```

- [ ] **Step 15: Verify build**

Run: `npx expo export --platform web --output-dir /tmp/nexo-p6-verify 2>&1 | tail -5`

Expected: Zero errors, bundle generated.

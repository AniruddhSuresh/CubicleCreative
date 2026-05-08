// ════════════════════════════════════════════════════════════════════════════
// LOCKEDIN — PROFILE DATA
// ════════════════════════════════════════════════════════════════════════════
// Loaded via <script src="profiles.js"> from index.html. Exposes the array
// as window.LOCKEDIN_PROFILES, which the main script reads on startup.
//
// To add a new profile: copy any of the blocks below, update every field,
// give it a unique numeric id, and add it inside the array. No other file
// needs to change.
//
// PROFILE SCHEMA:
//   id           — unique number
//   name         — display name
//   tagline      — under-name subtitle
//   emoji        — placeholder photo (any single emoji)
//   bio          — short paragraph
//   prompt       — { q: "Hinge-style question", a: "satirical answer" }
//   funFacts     — array of 3 short strings
//   interests    — array of tag strings
//   experience   — array of { role, company, icon }  (icon = emoji)
//   posts        — array of { time, text, likes, reposts }
//                  text supports \n for line breaks; long posts auto-expand
//   comments     — array of { author, text, neg }    (neg=true shows red)
//   requirements — { looks, charisma, smarts, networking, nepotism }
//                  used in match probability calculation
//   chat         — branching dialogue tree (see below)
//
// CHAT TREE STRUCTURE:
//   chat: {
//     start: 'nodeId',           // first node played on chat open
//     nodes: {
//       nodeId: {
//         npc: ["bubble 1", "bubble 2", ...],   // one or more NPC messages
//         options: [                            // user's reply choices
//           { text: "your reply", next: "nextNodeId" },
//           { text: "alt reply",  next: "differentNodeId" },
//         ],
//         end: 'success' | 'failed' | 'ghosted' | 'scammed'  // terminal node
//       }
//     }
//   }
//
// OUTCOMES (terminal node `end` values):
//   success — got the job offer (green badge in matches list)
//   failed  — instant burn / said something offensive (red badge)
//   ghosted — polite fizzle, time-waster (grey badge)
//   scammed — agreed to MLM / coaching pitch instead of a job (amber badge)
//
// MATCH REQUIREMENTS:
//   Probability = sum(min(userStat, requirementStat)) / sum(requirementStat)
//   Total requirement points across the 5 stats can be anything, but ~10
//   keeps difficulty roughly balanced with the user's 10 starting points.
// ════════════════════════════════════════════════════════════════════════════

window.LOCKEDIN_PROFILES = [

    // ── 1. CHAD SYNERGY — Founder. Hireable but tests for grindset. ─────
    {
      id: 1, name: 'Chad Synergy', tagline: 'Vibe Engineer @ Stealth Startup', emoji: '💼',
      bio: "I don't just disrupt — I unlock paradigms. Currently building the Uber of breathing. Ex-McKinsey. INTJ. Goggins acolyte.",
      prompt: { q: "I get unreasonably excited about", a: "people who reply to emails before 6am. The only acceptable hour to wake up is 4." },
      funFacts: [
        "I haven't taken a vacation in 7 years and I'm not bragging (I am)",
        "My LinkedIn header is a photo of me at the gym",
        "I have read 'The 4-Hour Workweek' and ignored every lesson",
      ],
      interests: ['Cold Plunges','Founder Mode','Greek Stoicism','Carnivore Diet','5am Club'],
      experience: [
        { role: 'Vibe Engineer', company: 'Stealth (Series A — DM me)', icon: '🚀' },
        { role: 'Growth Lead',   company: 'A pre-revenue thing',         icon: '📈' },
        { role: 'Analyst',       company: 'McKinsey & Company',          icon: '🏢' },
      ],
      posts: [
        { time: '2h', text: "Got rejected by 47 VCs today. Reframed it as 47 free pieces of feedback. The grindset is undefeated. 💪",
          likes: 1247, reposts: 89 },
        { time: '1d', text: "Unpopular opinion: if you're not stressed, you're not growing.\n\nAt my last startup we worked Christmas morning and the team thanked me for it.\n\nI fired anyone who used PTO. Some called it 'illegal.' I called it culture.\n\nDM me if you want to be part of something special.",
          likes: 3201, reposts: 412 },
        { time: '3d', text: "My morning routine:\n\n4:15am — Wake up (no alarm, my body knows)\n4:20am — Cold plunge (33°F, 4 minutes)\n4:35am — 90 minutes of deep work before checking phone\n6:00am — Bone broth + creatine + Lion's Mane\n6:15am — Read 50 pages\n7:00am — Gym (push day)\n8:30am — First meeting\n\nThis is non-negotiable. Most people will never understand what it takes.",
          likes: 5402, reposts: 731 },
      ],
      comments: [
        { author: 'Karen Hustles',   text: 'This is so true. So inspiring. Sharing with my team.', neg: false },
        { author: 'Brad Optimizes',  text: 'Massive. Mindset is everything.', neg: false },
        { author: 'Anonymous Burner', text: 'Bro you are 24 and have never shipped a product', neg: true },
        { author: 'Tracy Real',      text: 'My ex-boss talked exactly like this and the company collapsed.', neg: true },
      ],
      requirements: { looks: 2, charisma: 4, smarts: 1, networking: 4, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey 👋","Saw your profile. Ambition is undeniable.","What are you working on right now?"],
            options: [
              { text: "Looking for my next role, actually.", next: 'pitch' },
              { text: "Just chilling honestly. Why?", next: 'instafail' },
              { text: "I'm grinding on a side project at 5am every day.", next: 'allyin' },
            ]
          },
          instafail: {
            npc: ["Chilling.","Yeah I don't think this is going to work out."],
            end: 'failed'
          },
          allyin: {
            npc: ["YES. That's the energy I'm looking for.","Tell me about it. What's the vision?"],
            options: [
              { text: "It's a SaaS for productivity nerds.", next: 'offer' },
              { text: "Honestly it's mostly an excuse to stay busy.", next: 'instafail' },
            ]
          },
          pitch: {
            npc: ["Perfect timing.","I'm hiring a 'Founding Vibes Engineer' — equity-only, 80hr weeks, no PTO for the first two years.","Are you the type who would die for the mission?"],
            options: [
              { text: "Absolutely. Where do I sign?", next: 'offer' },
              { text: "Equity-only? I have rent.", next: 'reject_money' },
              { text: "Tell me about benefits first.", next: 'reject_benefits' },
            ]
          },
          reject_money: {
            npc: ["If you're thinking about money you're not founder material.","Pass."],
            end: 'failed'
          },
          reject_benefits: {
            npc: ["Benefits? The benefit is the journey.","I think we want different things."],
            end: 'ghosted'
          },
          offer: {
            npc: ["I knew you were the one.","Sending you the offer letter now. We start Monday at 5am sharp.","Welcome to the team."],
            end: 'success'
          },
        }
      }
    },

    // ── 2. TIFFANY QUARTZ — MLM. Will try to sell you a course. ─────────
    {
      id: 2, name: 'Tiffany Quartz', tagline: 'Wellness Architect ✨ Manifesting CEO', emoji: '🧘',
      bio: "I help high-vibe women monetize their feminine energy. 7-figure mindset coach. My morning routine is 4 hours long and you should ask about it.",
      prompt: { q: "The way to win me over", a: "tell me you're 'ready to invest in yourself' (in my $8K course)" },
      funFacts: [
        "I have never had a real job",
        "My income screenshots are from one really good month in 2022",
        "I have crystals on my desk for 'energetic alignment' (and TikTok)",
      ],
      interests: ['Manifestation','Hot Yoga','Almond Lattes','Crystals','Personal Branding'],
      experience: [
        { role: 'Founder & CVO',     company: 'Quartz Wellness Co.',  icon: '🌸' },
        { role: 'Lifestyle Curator', company: 'Self-employed',         icon: '✨' },
        { role: 'Brand Ambassador',  company: 'Several MLMs',          icon: '💎' },
      ],
      posts: [
        { time: '4h', text: "Just launched my new course: 'Manifest Your First $10K Month (Even If You're Lazy).' Link in bio. The universe rewards action. 🌟",
          likes: 891, reposts: 124 },
        { time: '2d', text: "Babe, I'm going to be honest with you.\n\nIf you're still trading hours for dollars in 2024, you're choosing scarcity.\n\nI used to be like you. Stuck in a 9-5 (for 6 weeks before I quit). Then I invested in MYSELF.\n\nI made my first $1,000 in passive income within 3 months (not counting the $8K I spent on the course that taught me).\n\nReady to break free? My DMs are open. (Application required. Investment starts at $4,997.)",
          likes: 2104, reposts: 356 },
        { time: '5d', text: "Reminder: your bank account is just a reflection of your beliefs.\n\nIf you don't have money, it's because you're blocking abundance. Not because of capitalism, inflation, or your circumstances.\n\nDo the work. Heal your relationship with money. Then DM me about my mastermind. ✨",
          likes: 1567, reposts: 203 },
      ],
      comments: [
        { author: 'Jenny Aligned', text: 'OBSESSED with your energy 😍😍', neg: false },
        { author: 'Madison Glow',  text: 'You inspire me daily. Joining now!', neg: false },
        { author: 'Sarah Skeptic', text: 'This is just an MLM with extra steps.', neg: true },
        { author: 'Former Client', text: 'I spent $8K on her course. Got a PDF and a Slack invite.', neg: true },
      ],
      requirements: { looks: 5, charisma: 3, smarts: 0, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi babe! ✨","I felt called to message you — your energy is SO aligned.","Tell me, what's blocking you right now?"],
            options: [
              { text: "I'm just looking for a job, honestly.", next: 'pivot1' },
              { text: "Nothing really? I'm doing fine.", next: 'pivot2' },
              { text: "Wait, are you trying to sell me something?", next: 'pivot3' },
            ]
          },
          pivot1: {
            npc: ["A 'job'? Babe.","What if I told you you'll never be free working for someone else?","I have an opportunity that changed my life. Want to hear about it?"],
            options: [
              { text: "Sure, I'm curious.", next: 'pitch' },
              { text: "If you're hiring, yes. Otherwise no.", next: 'pitch' },
              { text: "I'd rather just have a normal job.", next: 'reject_normie' },
            ]
          },
          pivot2: {
            npc: ["Doing fine?","Babe, 'fine' is the enemy of greatness.","Most people settle. I help women UNLEASH. Want in?"],
            options: [
              { text: "Tell me more.", next: 'pitch' },
              { text: "I'm good, thanks.", next: 'reject_normie' },
            ]
          },
          pivot3: {
            npc: ["I'm not 'selling' anything 💕","I'm offering you an opportunity to invest in yourself.","Most people can't see the difference. Can you?"],
            options: [
              { text: "...go on.", next: 'pitch' },
              { text: "Yeah this is just an MLM. Bye.", next: 'reject_callout' },
            ]
          },
          reject_normie: {
            npc: ["I love that for you 🥰","Manifesting big things for your little life ✨"],
            end: 'ghosted'
          },
          reject_callout: {
            npc: ["You're not ready. The universe will bring you back when you are. 🙏","BLOCKED."],
            end: 'failed'
          },
          pitch: {
            npc: ["My signature program 'Quartz Queens' is opening enrollment 💎","It's a 12-week container for high-frequency women ready to scale.","The investment is $8,997 — payment plans available.","Ready to claim your spot?"],
            options: [
              { text: "Wait — this isn't a job offer?", next: 'finalpitch' },
              { text: "Sign me up I guess?", next: 'scammed' },
              { text: "Hard pass.", next: 'reject_callout' },
            ]
          },
          finalpitch: {
            npc: ["A 'job' would CAP your earning potential, babe.","With my program you become your own boss. (And recruit other women into the program.)","Last chance. In or out?"],
            options: [
              { text: "I'll take it.", next: 'scammed' },
              { text: "Out. Definitely out.", next: 'reject_callout' },
            ]
          },
          scammed: {
            npc: ["AHHH YAY!! 💕✨","Sending you the contract now. Non-refundable.","Welcome to the Quartz family! (You're now expected to recruit 3 more women within 30 days.)"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 3. TRENT MAXIMILIAN III — Trust fund. Ghosts you for being poor. ─
    {
      id: 3, name: 'Trent Maximilian III', tagline: 'Strategic Investor • Family Office', emoji: '🎩',
      bio: "Third-generation investor. Father owns the building you work in. I like sailing, polo, and 'finding myself' between trust fund disbursements.",
      prompt: { q: "My most controversial opinion", a: "rent control is theft and so is paying for my own meals" },
      funFacts: [
        "I went to Wharton because dad made a building",
        "I have never used public transit",
        "I once 'started a company' that was just my dad's accountant rebranded",
      ],
      interests: ['Polo','Yachting','Vintage Watches','Aspen','Sotheby\'s Auctions'],
      experience: [
        { role: 'Principal',       company: 'Maximilian Family Office',           icon: '🏛️' },
        { role: 'Board Member',    company: 'Three companies dad bought',          icon: '👔' },
        { role: 'Summer Analyst',  company: 'Goldman Sachs (his uncle\'s desk)',   icon: '💰' },
      ],
      posts: [
        { time: '1d', text: "Reflecting on my journey today. Started from the bottom (Wharton) and through hard work and grit (and a $10M seed loan from family) built something real.\n\nIt wasn't easy. There were many lunches at the country club where I had to make difficult decisions about which bottle of wine to order.\n\nGrateful for the haters who said I'd never make it (no one ever said this).",
          likes: 412, reposts: 23 },
        { time: '4d', text: "Took the family yacht out this weekend. Sometimes you need to disconnect to reconnect with what matters: networking with other yacht owners.",
          likes: 187, reposts: 8 },
      ],
      comments: [
        { author: 'Alistair Wellington', text: 'Inspiring story Trent. Lunch at the club Thursday?', neg: false },
        { author: 'Buffy Hampton',       text: 'So humble. So self-made.', neg: false },
        { author: 'Jake Working',        text: 'Bro you literally inherited everything', neg: true },
      ],
      requirements: { looks: 2, charisma: 1, smarts: 1, networking: 3, nepotism: 5 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello.","Where did you go to university?"],
            options: [
              { text: "Harvard.", next: 'pedigree' },
              { text: "State school. Why?", next: 'classist' },
              { text: "I didn't.", next: 'classist' },
            ]
          },
          pedigree: {
            npc: ["Ah. Acceptable.","Who's your father?"],
            options: [
              { text: "Just a regular guy.", next: 'classist' },
              { text: "He owns a small business.", next: 'classist' },
              { text: "He's on the board of [important sounding place].", next: 'inside' },
            ]
          },
          classist: {
            npc: ["I see.","Listen, I think there's been a misunderstanding.","I don't really do this with… your sort.","Best of luck."],
            end: 'ghosted'
          },
          inside: {
            npc: ["Oh splendid! Small world.","I'm always looking for the right kind of people for our portfolio companies.","Lunch at the club Thursday? I'll have my assistant arrange it."],
            options: [
              { text: "Thursday works.", next: 'offer' },
              { text: "Can we do a video call instead?", next: 'classist' },
            ]
          },
          offer: {
            npc: ["Excellent. We'll find a place for you.","Title to be determined. Compensation will be 'competitive.' Don't ask what that means."],
            end: 'success'
          },
        }
      }
    },

    // ── 4. DR. AARON PATEL-GOLDSTEIN — Pseudo-intellectual. Time-waster. ─
    {
      id: 4, name: 'Dr. Aaron Patel-Goldstein', tagline: 'PhD, MD, MBA, JD • Dad', emoji: '🤓',
      bio: "Quadruple-degreed polymath. I will explain blockchain to you uninvited. I have 4 podcasts. None of my coworkers like me but I'm certain that's their problem.",
      prompt: { q: "I want to know your thoughts on", a: "the simulation hypothesis (I will not respect any answer)" },
      funFacts: [
        "I correct grammar in DMs",
        "I have a Substack 17 people subscribe to",
        "I once told my boss he was 'philosophically wrong' in a 1:1",
      ],
      interests: ['Rationalism','Effective Altruism','Lex Fridman','Chess','Ergonomic Keyboards'],
      experience: [
        { role: 'Research Fellow',   company: 'Institute You Haven\'t Heard Of', icon: '🔬' },
        { role: 'Visiting Lecturer', company: 'Stanford (one guest seminar)',  icon: '🎓' },
        { role: 'Co-author',         company: '47 papers, 0 citations',         icon: '📚' },
      ],
      posts: [
        { time: '6h', text: "Hot take: most people aren't reading enough.\n\nI read 3 books a week. Currently re-reading Sapiens for the 8th time. The first 7 readings, I felt I was missing something. Now I'm certain everyone else is.\n\nAsk me anything.",
          likes: 87, reposts: 4 },
        { time: '2d', text: "Wrote a 9,400-word essay on why most management theory is intellectually bankrupt.\n\nNo one at my company has read it.\n\nThis says more about them than me.",
          likes: 32, reposts: 1 },
      ],
      comments: [
        { author: 'Jason Optimal',  text: "What's your stance on the Fermi paradox?", neg: false },
        { author: 'Dr. Aaron Patel-Goldstein', text: '@Jason great question, I\'ve written extensively on this in my Substack.', neg: false },
        { author: 'Rachel Real',    text: 'You have been at this company 6 years and never been promoted. Maybe think about why.', neg: true },
      ],
      requirements: { looks: 0, charisma: 1, smarts: 5, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello.","Before we continue, I need to assess intellectual compatibility.","What's your take on the trolley problem?"],
            options: [
              { text: "Pull the lever. One vs five. Easy.", next: 'shallow' },
              { text: "It depends on the variant. The Foot version is more interesting.", next: 'deeper' },
              { text: "Honestly, I just want to know if you're hiring.", next: 'rude' },
            ]
          },
          rude: {
            npc: ["Fascinating that you reduced this to transactions.","I'm not sure we're an intellectual match."],
            end: 'failed'
          },
          shallow: {
            npc: ["Hmm. Surface-level.","Have you read Parfit?"],
            options: [
              { text: "No, but I'd like to.", next: 'lecture' },
              { text: "Yes, actually.", next: 'deeper' },
              { text: "Look, are we talking about jobs or not?", next: 'rude' },
            ]
          },
          deeper: {
            npc: ["Interesting.","You may be one of the few I can have a real conversation with.","I should send you my essay. It's 14,000 words."],
            options: [
              { text: "Sure, send it over.", next: 'lecture' },
              { text: "Can we talk about the role first?", next: 'rude' },
            ]
          },
          lecture: {
            npc: ["Sent. Three more on the way.","Also a podcast episode and my forthcoming book draft.","Read these and we'll reconvene next month."],
            options: [
              { text: "Next month? I needed a job soon.", next: 'rude' },
              { text: "OK, I'll get on it.", next: 'forever' },
            ]
          },
          forever: {
            npc: ["Excellent.","I'll follow up… eventually.","(He never follows up.)"],
            end: 'ghosted'
          },
        }
      }
    },

    // ── 5. BRITTANY PEAK — Influencer. Sensitive. Easy to offend. ───────
    {
      id: 5, name: 'Brittany Peak', tagline: 'Content Creator • 2.4M followers', emoji: '🤳',
      bio: "Day in my life: gym → green juice → photoshoot → cry → repeat. Brand collabs: brittany@socialhouse.co. My therapist is also my publicist.",
      prompt: { q: "A non-negotiable for me is", a: "you can't be uglier than me in photos. It throws off my grid." },
      funFacts: [
        "I have cried on camera 47 times this year (12 were genuine)",
        "I bought my followers in 2019 and now they're real",
        "I've been canceled three times and called it 'growth'",
      ],
      interests: ['Pilates','Brand Deals','Self-Care Sundays','Mukbangs','PR Boxes'],
      experience: [
        { role: 'Content Creator', company: 'Self-employed', icon: '📱' },
        { role: 'Brand Partner',   company: 'Skims, Sephora', icon: '💄' },
        { role: 'Influencer',      company: 'Instagram',      icon: '✨' },
      ],
      posts: [
        { time: '1h', text: "Get ready with me to read mean comments about myself! Spoiler: I cry in a Range Rover. Linked the lipgloss in my bio. 💋",
          likes: 41203, reposts: 1842 },
        { time: '3d', text: "Being a creator is HARD.\n\nPeople don't understand the pressure of staying relevant. The constant comparison. The 4am photoshoots. The brand deal rejections.\n\nLast week I cried for 11 hours straight because a brand only offered me $40K for one post.\n\nBeing pretty is a full-time job and I deserve grace. 💔",
          likes: 18904, reposts: 502 },
      ],
      comments: [
        { author: 'fan_account_142',   text: 'QUEEN. ICON. LEGEND.', neg: false },
        { author: 'Beauty Brand Co.',  text: "DM'd you about a collab! 💌", neg: false },
        { author: 'Nicole Reality',    text: 'Bestie you got paid $40k to take ONE photo', neg: true },
      ],
      requirements: { looks: 5, charisma: 4, smarts: 0, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hiii 💕","OMG sorry just got out of a brand meeting","So like — what do you think of my content?"],
            options: [
              { text: "It's amazing! You're so authentic.", next: 'flattered' },
              { text: "I haven't really seen much, honestly.", next: 'offended' },
              { text: "Bit much, no?", next: 'instakill' },
            ]
          },
          instakill: {
            npc: ["…","I'm literally crying right now.","BLOCKED."],
            end: 'failed'
          },
          offended: {
            npc: ["You haven't SEEN my content?","I have 2.4M followers babe.","I'm not sure this is going to work."],
            end: 'ghosted'
          },
          flattered: {
            npc: ["OMG you GET it 🥹","I'm actually hiring an assistant. Are you available 24/7?","Pay is exposure but you'd get to be in some of my content. (Background only.)"],
            options: [
              { text: "Sounds amazing! Yes!", next: 'offer_unpaid' },
              { text: "Is there actual money involved?", next: 'no_money' },
              { text: "I'd need a real salary.", next: 'no_money' },
            ]
          },
          no_money: {
            npc: ["Money? Babe. EXPOSURE.","People would KILL to be in my orbit.","I think you're not visionary enough for this."],
            end: 'ghosted'
          },
          offer_unpaid: {
            npc: ["YES. I knew you got it.","Sending you the NDA now. You'll need to be available weekends, evenings, and holidays.","Welcome to Team Brittany 💖"],
            end: 'success'
          },
        }
      }
    },

    // ── 6. MARCUS IRON — Workaholic. Hires anyone. Run. ─────────────────
    {
      id: 6, name: 'Marcus Iron', tagline: 'Workaholic • Sleep is for the weak', emoji: '☕',
      bio: "100-hour weeks. 4 hours of sleep. I haven't seen my kids in 6 months but I'm crushing my OKRs. Ask me about my Notion stack.",
      prompt: { q: "You should leave if", a: "you check out at 5pm or use the phrase 'work-life balance' unironically" },
      funFacts: [
        "I email at 3am to keep my team 'sharp'",
        "My 'PTO' last year was a Zoom call from a hospital",
        "My wedding ring is somewhere on my desk",
      ],
      interests: ['Productivity','Cold Brew','Notion','Deep Work','Quitting Slack at 11pm'],
      experience: [
        { role: 'Senior Director', company: 'BigCorp Inc.',           icon: '🏢' },
        { role: 'Director',        company: 'BigCorp Inc.',           icon: '🏢' },
        { role: 'Manager',         company: 'BigCorp Inc.',           icon: '🏢' },
        { role: 'Analyst',         company: 'BigCorp Inc. (8 yrs)',   icon: '🏢' },
      ],
      posts: [
        { time: '5h', text: "Worked through Christmas. Wife hasn't spoken to me since. But shipped the Q4 deck. Worth it. 🚀 Who else is grinding?",
          likes: 524, reposts: 78 },
        { time: '2d', text: "I sleep 4 hours a night and you're not going to outwork me. Ever.\n\nMy team Slacks me at midnight and they BETTER respond. If you 'have boundaries' you should work somewhere else. Like a library.",
          likes: 1102, reposts: 134 },
      ],
      comments: [
        { author: 'Greg Burnout',  text: 'Same brother. Get it.', neg: false },
        { author: 'Rachel HR',     text: 'Marcus, please use your PTO. — HR', neg: true },
        { author: 'His Wife',      text: 'Marcus come home.', neg: true },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 3, networking: 3, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["You up? It's 11:47pm.","Good. That's already a green flag.","I'm hiring. Are you available for a 'quick call'? (90 minutes minimum.)"],
            options: [
              { text: "Sure, when works?", next: 'now' },
              { text: "It's late, can we do tomorrow?", next: 'late' },
              { text: "What's the role?", next: 'role' },
            ]
          },
          late: {
            npc: ["'Late.'","If we're not aligned on availability, this won't work."],
            end: 'failed'
          },
          now: {
            npc: ["Sending invite for midnight tonight.","Be there. Camera on."],
            options: [
              { text: "Done.", next: 'offer' },
              { text: "Wait, what's the role?", next: 'role' },
            ]
          },
          role: {
            npc: ["Senior Project Catalyst.","60-80 hours expected. Salary 'competitive.' Don't ask.","Are you in?"],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "What's the salary actually?", next: 'failed_salary' },
              { text: "60-80 hours? No thanks.", next: 'failed_salary' },
            ]
          },
          failed_salary: {
            npc: ["If you have to ask about money you're not the one.","Next."],
            end: 'failed'
          },
          offer: {
            npc: ["YES.","Offer letter in your inbox. We start tonight.","Sleep is optional. Welcome to Iron's team."],
            end: 'success'
          },
        }
      }
    },

    // ── 7. ZOE AUTHENTIC — Coach. MLM-adjacent. ─────────────────────────
    {
      id: 7, name: 'Zoe Authentic', tagline: 'Founder • Coach • Speaker • Author', emoji: '🌿',
      bio: "I left my 6-figure consulting job to find myself in Bali. Now I help others find themselves (for $8K). Author of 'Unburdened.' My dog has a verified account.",
      prompt: { q: "We'll get along if you", a: "can pretend my husband's salary doesn't exist" },
      funFacts: [
        "My 'business' is funded by my husband's job at McKinsey",
        "I haven't paid for a meal since 2019 (always 'business expense')",
        "My book has 12 reviews. 11 are from family.",
      ],
      interests: ['Sound Baths','Plant Medicine','Journaling','Bali','My Truth'],
      experience: [
        { role: 'Founder',  company: 'Authentic AF Coaching',  icon: '🌺' },
        { role: 'Author',   company: 'Self-published',          icon: '📖' },
        { role: 'Ex-McK',   company: 'Won\'t shut up about it', icon: '🥥' },
      ],
      posts: [
        { time: '6h', text: "I quit my soul-crushing job and now make 10x as a coach.\n\nIf I can do it, you can too!\n\n(Disclaimer in 8pt font: I had $200K saved, a husband with a job, and family money. But forget that part.)",
          likes: 2204, reposts: 318 },
      ],
      comments: [
        { author: 'Lily Awakened',     text: "You're my role model 🙏", neg: false },
        { author: 'Random Stranger',   text: 'How do you afford rent?', neg: true },
        { author: 'Her Sister',        text: "Mom's still paying for your gym membership Zoe.", neg: true },
      ],
      requirements: { looks: 3, charisma: 3, smarts: 1, networking: 3, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi soul ✨","I'm picking up some really aligned energy from you.","Are you ready to step into your power?"],
            options: [
              { text: "I'm just looking for a job actually.", next: 'pivot' },
              { text: "Sure, what does that mean?", next: 'pivot' },
              { text: "I think this is a sales pitch.", next: 'reject' },
            ]
          },
          reject: {
            npc: ["I love that for you. Truly.","Not everyone is ready for transformation. 🌸"],
            end: 'ghosted'
          },
          pivot: {
            npc: ["I run a 6-month container called 'Awaken Your Worth.'","It's $6,500. Or $7,500 with the Bali retreat.","Most of my clients double their income within 90 days. (Anecdotally. No data.)"],
            options: [
              { text: "Interesting, tell me more.", next: 'pitch2' },
              { text: "That's a lot of money for a Zoom call.", next: 'reject' },
            ]
          },
          pitch2: {
            npc: ["The investment is the entry fee for the woman you're becoming.","Are you in?"],
            options: [
              { text: "I'm in.", next: 'scammed' },
              { text: "Let me think about it.", next: 'pressure' },
            ]
          },
          pressure: {
            npc: ["The next cohort fills today.","If you're hesitating, you're not ready. ✨","No pressure but also: this exact moment is your sign."],
            options: [
              { text: "Fine, I'll do it.", next: 'scammed' },
              { text: "Actually no.", next: 'reject' },
            ]
          },
          scammed: {
            npc: ["YES! 🌸","Sending the contract. Non-refundable. No guarantees of outcome.","Welcome to the most expensive group chat of your life."],
            end: 'scammed'
          },
        }
      }
    },

    // ── 8. KADEN CHIP — AI bro. Fake startup. Time-waster. ──────────────
    {
      id: 8, name: 'Kaden Chip', tagline: 'AI Whisperer 🤖 ex-OpenAI (intern)', emoji: '🧠',
      bio: "I don't write code, I prompt orchestrate. Built 12 SaaS products this month with no users. AGI is 6 months away. Trust me bro.",
      prompt: { q: "Two truths and a lie", a: "1. I built 12 startups. 2. None of them work. 3. AGI is 6 months away. (One of these is a lie, you decide.)" },
      funFacts: [
        "My 'startup' is a ChatGPT wrapper",
        "I have 47 GitHub repos and 0 stars total",
        "I tweet about 'shipping' more than I ship",
      ],
      interests: ['Prompt Engineering','Vibecoding','Twitter Threads','Hackathons','AGI Doomerism'],
      experience: [
        { role: 'Founder',         company: 'Yet Another AI Wrapper',   icon: '🤖' },
        { role: 'Indie Hacker',    company: 'Self (12 projects, 0 MRR)', icon: '💻' },
        { role: 'Summer Intern',   company: 'OpenAI (cafeteria)',        icon: '☕' },
      ],
      posts: [
        { time: '3h', text: "Day 47 of #buildinpublic.\n\nMRR: $0\nUsers: 0\nTwitter followers: +3\n\nWe're so back. The dip is part of the journey. 🚀",
          likes: 89, reposts: 12 },
        { time: '5d', text: "AGI in 6 months. Mark this post.\n\n(I will delete this in 6 months when I'm wrong.)",
          likes: 234, reposts: 45 },
      ],
      comments: [
        { author: 'GrindHard_Pete', text: 'Keep cooking king', neg: false },
        { author: 'AI Bro Daily',   text: 'Featuring you in my newsletter!', neg: false },
        { author: 'Sarah Eng',      text: 'Bro you have no users. None.', neg: true },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 4, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["yo","what's your stack","actually nm — just tell me: bullish or bearish on AGI"],
            options: [
              { text: "Bullish. Obviously.", next: 'maybe' },
              { text: "Bearish. It's overhyped.", next: 'reject' },
              { text: "I just want a job.", next: 'reject' },
            ]
          },
          reject: {
            npc: ["damn ok","you're not ready for what's coming","gl tho 🫡"],
            end: 'ghosted'
          },
          maybe: {
            npc: ["respect","I might have something for you","I'm hiring 'Founding AI Engineers' (5 of them, equity only)","you'd be co-founder #6"],
            options: [
              { text: "How much equity?", next: 'equity' },
              { text: "Sounds amazing!", next: 'string' },
              { text: "Equity-only? No.", next: 'reject' },
            ]
          },
          equity: {
            npc: ["0.05%","but it's a 'pre-seed unicorn'","trust me bro"],
            options: [
              { text: "I'm in.", next: 'string' },
              { text: "0.05%? That's nothing.", next: 'reject' },
            ]
          },
          string: {
            npc: ["LFG","sending you the Notion","actually one sec, on a call","actually two secs, my cofounder needs me","brb 🫡","(he never came back)"],
            end: 'ghosted'
          },
        }
      }
    },

    // ── 9. MARGARET PEARCE-WHITLEY — Networker. Actually helpful. ───────
    {
      id: 9, name: 'Margaret Pearce-Whitley', tagline: 'Networking Powerhouse • Connector', emoji: '🦋',
      bio: "I know everyone. Quite literally everyone. If you need an intro, I'm your person. I've attended 312 networking events this year. I do not work.",
      prompt: { q: "An ideal first meeting is", a: "you, me, and four other strangers I've also asked to coffee this week" },
      funFacts: [
        "I have 30,000 LinkedIn connections and remember 4 of them",
        "I once introduced myself to someone twice in one event",
        "My calendar is mostly other people's calendars",
      ],
      interests: ['Networking Events','LinkedIn DMs','Conferences','Coffee Chats','Name Dropping'],
      experience: [
        { role: 'Connector',         company: 'The Network',                  icon: '🌐' },
        { role: 'Community Builder', company: 'Several Slack groups',         icon: '💬' },
        { role: 'Event Host',        company: 'My own LinkedIn Lives',        icon: '🎤' },
      ],
      posts: [
        { time: '2h', text: "Just hit 30,000 LinkedIn connections!\n\nSlid into a CEO's DMs and now we're 'in talks.' Reminder: your network is your net worth. ✨\n\n(Note: I do not actually have a job.)",
          likes: 3402, reposts: 489 },
      ],
      comments: [
        { author: 'Connection #29,847', text: 'Congrats Margaret!', neg: false },
        { author: 'Bob Networker',      text: 'How do I get on your calendar?', neg: false },
        { author: 'Real Person',        text: "Margaret what is your actual job", neg: true },
      ],
      requirements: { looks: 2, charisma: 3, smarts: 1, networking: 5, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Darling! 💕","I just KNOW we're meant to connect.","Tell me — what kind of role are you looking for?"],
            options: [
              { text: "Honestly anything in marketing.", next: 'helpful' },
              { text: "I'm not sure yet.", next: 'helpful' },
              { text: "Are you actually hiring?", next: 'honest' },
            ]
          },
          honest: {
            npc: ["Hiring? No darling, I don't have a job.","But I know everyone who does! 💕","Want me to introduce you to someone?"],
            options: [
              { text: "Yes please!", next: 'helpful' },
              { text: "I was kind of hoping for a direct opportunity…", next: 'fizzle' },
            ]
          },
          fizzle: {
            npc: ["Aw babe — direct opportunities are SO old-fashioned.","Networking is the way. Let me know if you change your mind! 💕"],
            end: 'ghosted'
          },
          helpful: {
            npc: ["I have just the person.","Sarah at Acme Corp owes me a favor.","Sending an intro now! Don't ghost me on the followup."],
            options: [
              { text: "Thank you so much!", next: 'success_intro' },
              { text: "Wait, should I be worried?", next: 'success_intro' },
            ]
          },
          success_intro: {
            npc: ["Done! Email sent. CC'd you both. ✨","She'll reach out within a week.","(She actually did. Margaret came through.)"],
            end: 'success'
          },
        }
      }
    },

    // ── 10. DEVON TRUSTFUND — Trust fund artist. Pure waste of time. ────
    {
      id: 10, name: 'Devon Trustfund', tagline: 'Photographer / DJ / Founder / Free Spirit', emoji: '📷',
      bio: "Living off my dad's investments while I 'figure things out.' Currently shooting film in Lisbon. My art is funded by inherited wealth I won't acknowledge.",
      prompt: { q: "I geek out about", a: "telling people I 'don't believe in capitalism' from my $4M Lisbon apartment" },
      funFacts: [
        "I have 7 Leicas. Have not sold a single print.",
        "I once said I 'don't really do money'",
        "My 'startup' was a $30K Shopify drop with one t-shirt",
      ],
      interests: ['Film Photography','Vinyl','Lisbon','Slow Living','Not Working'],
      experience: [
        { role: 'Photographer',  company: 'Self (unbooked)',            icon: '📸' },
        { role: 'DJ',            company: 'Friends\' parties',          icon: '🎧' },
        { role: 'Founder',       company: 'A clothing brand (1 drop)',  icon: '👕' },
      ],
      posts: [
        { time: '1d', text: "Capturing the soul of Lisbon on 35mm. There's a magic here you can't find in corporate America.\n\n(My rent is paid by my trust.) 🌅",
          likes: 287, reposts: 14 },
      ],
      comments: [
        { author: 'Sage Boheme',  text: 'Such soulful work 🤍', neg: false },
        { author: "Devon's Dad",  text: 'Devon, please call your mother.', neg: true },
      ],
      requirements: { looks: 4, charisma: 2, smarts: 0, networking: 1, nepotism: 4 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["heyyy","what's your vibe","i don't really do 'jobs' but i collaborate with kindred souls"],
            options: [
              { text: "Cool, I'm pretty kindred.", next: 'maybe' },
              { text: "I literally need a paying job.", next: 'reject' },
              { text: "Are you offering one or…?", next: 'reject' },
            ]
          },
          reject: {
            npc: ["yeah jobs are very colonial of you","best of luck with your hustle ✌️"],
            end: 'ghosted'
          },
          maybe: {
            npc: ["nice","i'm doing a 'project'","might need someone to carry my film and source vintage cameras","unpaid but you'd be CREDITED"],
            options: [
              { text: "I'll pass.", next: 'reject' },
              { text: "Sure, when?", next: 'flake' },
            ]
          },
          flake: {
            npc: ["maybe next week","or next month","tbh i'm going to a sound bath in Tulum","ill hit you up","(he won't.)"],
            end: 'ghosted'
          },
        }
      }
    },

];

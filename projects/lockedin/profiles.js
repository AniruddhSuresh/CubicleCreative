// ════════════════════════════════════════════════════════════════════════════
// LOCKEDIN — PROFILE DATA
// ════════════════════════════════════════════════════════════════════════════
// 50 satirical professional profiles. Each has a Hinge-style bio, posts,
// comments, and a branching chat tree leading to one of several outcomes.
//
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

    // ── 11. KAREN ULTIMATUM — Suburban mom turned MLM warrior. ──────────
    {
      id: 11, name: 'Karen Ultimatum', tagline: 'Boss Babe • Wine Mom • #LiveLaughLeggings', emoji: '🍷',
      bio: "Mom of 3, dog mom of 1, side hustle queen. Selling [redacted essential oils company] to financially abuse my high school friends. Trust me bestie this is NOT an MLM.",
      prompt: { q: "Best advice I've ever received", a: "make it about Jesus AND money. People can't say no to either." },
      funFacts: [
        "I started 14 'businesses' since 2018",
        "I have a vision board with a yacht I will never own",
        "My husband's salary funds my 'entrepreneurship'",
      ],
      interests: ['Mom Life','Wine','Essential Oils','Cricut','Live Laugh Love'],
      experience: [
        { role: 'CEO of Me',           company: 'My living room',         icon: '👑' },
        { role: 'Independent Distributor', company: 'You-Know-Which-Company', icon: '🧴' },
        { role: 'Stay-at-Home Mom',    company: 'Three kids',              icon: '🏠' },
      ],
      posts: [
        { time: '3h', text: "BESTIE!!! 💗💗💗\n\nI made $87 in passive income today!!! (I also spent $340 on inventory but we don't talk about that.)\n\nIf I can do this YOU can do this. DM me 'BOSS' for details!!!",
          likes: 234, reposts: 12 },
        { time: '1d', text: "To the woman in Target who asked if I was 'one of those MLM moms':\n\nYou don't have to be RUDE. I'm just trying to feed my family. (My husband makes $180K but ALSO I'm trying to feed my family.)\n\nUnfollow if this offends you 💕✌️",
          likes: 567, reposts: 89 },
      ],
      comments: [
        { author: 'Jess Bestie4Eva', text: 'YESSS GIRL!! 💗💗', neg: false },
        { author: 'Her Old Friend',   text: "Karen please stop DMing me about lavender oil", neg: true },
        { author: 'Mom Truth',        text: "This is Amway with a Cricut machine", neg: true },
      ],
      requirements: { looks: 3, charisma: 4, smarts: 0, networking: 3, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["HEYYY BESTIE 💗💗","I just got a feeling we were meant to connect 🥰","Are you a MOM or just SLAYING in general??"],
            options: [
              { text: "Just slaying I guess?", next: 'pitch' },
              { text: "I'm looking for a real job actually.", next: 'pitch_hard' },
              { text: "Bestie I am a man.", next: 'unfazed' },
            ]
          },
          unfazed: {
            npc: ["DOESN'T MATTER 💗","My business is for ALL genders bestie","(except I will only target your wife later)"],
            options: [
              { text: "Ok what's the pitch.", next: 'pitch' },
              { text: "Goodbye Karen.", next: 'reject' },
            ]
          },
          pitch: {
            npc: ["I'm building a TEAM bestie 💗","It's not an MLM (it's an MLM)","Initial investment: $499 for the starter kit","You'll make MILLIONS"],
            options: [
              { text: "I'll pass.", next: 'reject' },
              { text: "Sure, send the link.", next: 'scammed' },
              { text: "Karen this is literally pyramid scheme.", next: 'mad' },
            ]
          },
          pitch_hard: {
            npc: ["A 'real job'?? 💗","Bestie that's CORPORATE SLAVERY","Be your own BOSS! (under me, in my downline)"],
            options: [
              { text: "No thanks.", next: 'reject' },
              { text: "Fine, what's involved?", next: 'pitch' },
            ]
          },
          mad: {
            npc: ["Excuse me??? 😡","I run a LEGITIMATE BUSINESS","BLOCKED. PRAYING FOR YOU. 🙏"],
            end: 'failed'
          },
          reject: {
            npc: ["Manifesting blessings for you babe 💗","(she will message you again in 6 months)"],
            end: 'ghosted'
          },
          scammed: {
            npc: ["AHHH BESTIE WELCOME TO THE FAM 💗💗💗","Sending the contract!!! Non-refundable!!!","You owe me $499 by Friday and you need to recruit 3 friends by month end 🥰"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 12. JONATHAN SAXBY-WORTHINGTON — Banker. Cocaine teeth. ─────────
    {
      id: 12, name: 'Jonathan Saxby-Worthington', tagline: 'VP @ Goldman • Patrick Bateman fan', emoji: '🏦',
      bio: "VP at Goldman. Squash, scotch, suits. I work 110-hour weeks and call it 'building character.' My favorite movie is American Psycho — I think it's an inspirational film.",
      prompt: { q: "Together we could", a: "discuss the merits of Mergers & Acquisitions over a $400 steak" },
      funFacts: [
        "I have memorized my own LinkedIn profile",
        "My business cards are bone-colored with a tasteful thickness",
        "I have screamed at an analyst before 7am every weekday for 3 years",
      ],
      interests: ['M&A','Squash','Scotch','Hermès Ties','Excel Modeling'],
      experience: [
        { role: 'Vice President', company: 'Goldman Sachs',          icon: '💼' },
        { role: 'Associate',      company: 'Goldman Sachs',          icon: '💼' },
        { role: 'Analyst',        company: 'Goldman Sachs',          icon: '💼' },
        { role: 'Intern',         company: 'Goldman Sachs (legacy)', icon: '💼' },
      ],
      posts: [
        { time: '6h', text: "Pulled an all-nighter for the Tuesday morning pitch. Slept 90 minutes in my office. Ate a $14 protein bar.\n\nThis is what success looks like.\n\n(My analysts cried at 4am. I bonus them well.)",
          likes: 432, reposts: 41 },
        { time: '2d', text: "If you're not in the office at 6am you're not committed to your career.\n\nI fired three people this quarter for 'lifestyle creep.' One had a child. Not my problem.",
          likes: 189, reposts: 22 },
      ],
      comments: [
        { author: 'Hudson Princeton', text: 'Brutal bro. Respect.', neg: false },
        { author: 'Anonymous Analyst', text: "I have not slept in 4 days because of this man", neg: true },
      ],
      requirements: { looks: 3, charisma: 2, smarts: 3, networking: 2, nepotism: 2 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Where do you work currently."],
            options: [
              { text: "Looking for my next role.", next: 'qualify' },
              { text: "I'm at a tech startup.", next: 'sneer' },
              { text: "I'm a freelancer.", next: 'instafail' },
            ]
          },
          instafail: {
            npc: ["A 'freelancer.'","I don't hire people who don't know what an 80-hour week looks like.","Goodbye."],
            end: 'failed'
          },
          sneer: {
            npc: ["A 'tech startup.'","Hm.","What's your TC."],
            options: [
              { text: "$300K total comp.", next: 'qualify' },
              { text: "It's mostly equity.", next: 'instafail' },
              { text: "Around $90K.", next: 'instafail' },
            ]
          },
          qualify: {
            npc: ["Acceptable.","I'm staffing the Q3 deal team.","Hours: 110/week. Comp: 'discretionary.'","You will hate yourself but you will be wealthy."],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "What's the actual base?", next: 'rude' },
              { text: "110 hours? I have a family.", next: 'instafail' },
            ]
          },
          rude: {
            npc: ["Asking about base in 2024.","Pathetic.","Find another firm."],
            end: 'failed'
          },
          offer: {
            npc: ["Good answer.","Offer letter Monday. We start the same day.","Welcome to the asylum."],
            end: 'success'
          },
        }
      }
    },

    // ── 13. PIPER ALMOND — Gen Z burnout. Ironic about everything. ──────
    {
      id: 13, name: 'Piper Almond', tagline: 'doing my best 🙃 • burnt out at 24', emoji: '💀',
      bio: "graduated 2021. seven internships, zero jobs. living with parents and lying about it on linkedin. my degree is in english literature so the joke writes itself.",
      prompt: { q: "I want someone who", a: "validates my catastrophic life choices and sends me job postings i won't apply to" },
      funFacts: [
        "i applied to 412 jobs last year. got 3 interviews. 0 offers.",
        "my 'side hustle' is a half-edited podcast with my friend molly",
        "i unironically use the word 'unalive' in conversation",
      ],
      interests: ['Sleeping','Doom Scrolling','Iced Coffee','Crying','Letterboxd'],
      experience: [
        { role: 'Marketing Intern',     company: 'Some Agency (paid in $15)',  icon: '😅' },
        { role: 'Content Intern',       company: 'A B2B SaaS no one uses',     icon: '😩' },
        { role: 'Editorial Assistant',  company: 'Magazine that died',          icon: '📰' },
      ],
      posts: [
        { time: '1h', text: "applied to 47 more jobs today. heard back from 0. ate a cookie. cried. normal tuesday.",
          likes: 1204, reposts: 89 },
        { time: '4h', text: "the job market is genuinely insane.\n\nentry level role: 5+ years experience, 3 PhDs, willing to work 60 hours, $42K, 'we're a family'\n\nwhy did i go to college again",
          likes: 4502, reposts: 712 },
      ],
      comments: [
        { author: 'molly fr',         text: 'queen we are not okay 💀', neg: false },
        { author: 'fellow grad',      text: 'in this with you bestie', neg: false },
        { author: 'boomer linkedin',  text: 'Have you tried networking?', neg: true },
      ],
      requirements: { looks: 2, charisma: 2, smarts: 3, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["heyy","ngl i didn't expect a match","are you also unemployed or"],
            options: [
              { text: "Same boat tbh.", next: 'kindred' },
              { text: "I'm employed actually.", next: 'curious' },
              { text: "I'm hiring, actually.", next: 'shock' },
            ]
          },
          kindred: {
            npc: ["okay so we just exist together then","wanna unalive our LinkedIns simultaneously","just kidding (not really)"],
            options: [
              { text: "Yeah let's do it.", next: 'mutual' },
              { text: "Want me to introduce you to someone hiring?", next: 'shock' },
            ]
          },
          mutual: {
            npc: ["this was nice","mutual unemployment is its own kind of love language","gl with the 412 applications king/queen 🫡"],
            end: 'ghosted'
          },
          curious: {
            npc: ["wow employed people are real","tell me your secret","also are you hiring"],
            options: [
              { text: "I might be, what do you do?", next: 'pitch_self' },
              { text: "Honestly nothing exciting.", next: 'mutual' },
            ]
          },
          shock: {
            npc: ["WAIT WHAT","you're hiring??","i — okay let me put on a real shirt"],
            options: [
              { text: "What are you actually good at?", next: 'pitch_self' },
              { text: "Tell me about yourself.", next: 'pitch_self' },
            ]
          },
          pitch_self: {
            npc: ["okay um","i can write things","i can edit things","i'm very online","i am a competent human being i promise","please i'm so tired"],
            options: [
              { text: "You're hired. Entry level role, fair pay.", next: 'crying' },
              { text: "I think we want different things.", next: 'devastated' },
              { text: "Send me your portfolio.", next: 'follow_through' },
            ]
          },
          devastated: {
            npc: ["…","that's fine","that's normal","everything is fine","(she's not fine)"],
            end: 'ghosted'
          },
          follow_through: {
            npc: ["sending it now","i actually have stuff i'm proud of","please be nice"],
            options: [
              { text: "It's good. You're hired.", next: 'crying' },
              { text: "Honestly... not what we need.", next: 'devastated' },
            ]
          },
          crying: {
            npc: ["i'm","i'm crying","sorry","i haven't gotten a job in 3 years","thank you. genuinely. THANK YOU 😭","i won't let you down"],
            end: 'success'
          },
        }
      }
    },

    // ── 14. RAJ KAPOOR JR — Indian immigrant prodigy. Real deal. ────────
    {
      id: 14, name: 'Raj Kapoor Jr.', tagline: 'CTO • IIT Bombay → MIT → Series B', emoji: '🦅',
      bio: "Built three companies before 30. IIT Bombay, MIT, Y Combinator. My parents still think I should have been a doctor. I have $40M in the bank and they won't let it go.",
      prompt: { q: "I'll know it's right when", a: "you have a clean LeetCode rating AND can survive my mother" },
      funFacts: [
        "I solved Project Euler problem 1 when I was 8",
        "My mom calls every day to ask why I haven't gotten married",
        "I have an actual H1 INDEX of 12",
      ],
      interests: ['Distributed Systems','ML','Cricket','Filter Coffee','My Mother\'s Calls'],
      experience: [
        { role: 'CTO',            company: 'NeuralFlow (Series B, $40M ARR)', icon: '🧠' },
        { role: 'Founding Engineer', company: 'YC W19 (acquired by Stripe)',     icon: '🚀' },
        { role: 'PhD Candidate (dropped out)', company: 'MIT CSAIL',              icon: '🎓' },
      ],
      posts: [
        { time: '4h', text: "We're hiring 5 senior engineers. Real comp, real equity, real product.\n\nNo 'vibes.' No 'culture.' No '5am club.' Just ship code that works.\n\n40-50 hour weeks. Unlimited PTO that we actually expect you to use. The bar is talent, not theatrics.\n\nDM me.",
          likes: 12404, reposts: 2103 },
        { time: '2d', text: "My mother just called to ask if I'm dating anyone.\n\nI told her I have $40M in the bank.\n\nShe asked if the woman I'm not dating is also Indian.\n\nThis cycle continues. 🙏",
          likes: 28401, reposts: 4203 },
      ],
      comments: [
        { author: 'Sarah Backend',    text: 'Working here has been the best 3 years of my career', neg: false },
        { author: 'Real Engineer',    text: "Finally — a tech job listing without 'rockstar' in it", neg: false },
        { author: 'Raj\'s Mom',       text: 'BETA when are you settling down', neg: false },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 4, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi.","Engineer or PM?"],
            options: [
              { text: "Engineer.", next: 'eng' },
              { text: "PM.", next: 'pm' },
              { text: "Neither, but I learn fast!", next: 'honest' },
            ]
          },
          eng: {
            npc: ["What's your strongest language?"],
            options: [
              { text: "Rust. Systems work.", next: 'real_eng' },
              { text: "Python and JavaScript.", next: 'real_eng' },
              { text: "Mostly use ChatGPT honestly.", next: 'reject' },
            ]
          },
          pm: {
            npc: ["What was your last shipped product?"],
            options: [
              { text: "Reduced churn 40% on a B2B SaaS, here's how.", next: 'real_pm' },
              { text: "Worked on 'strategy.'", next: 'reject' },
              { text: "Mostly slide decks.", next: 'reject' },
            ]
          },
          honest: {
            npc: ["Honest. I respect that.","Tell me one thing you've actually built or shipped — anywhere, any context."],
            options: [
              { text: "Built a small tool that helped 200 people.", next: 'real_eng' },
              { text: "Honestly nothing yet.", next: 'reject_kind' },
            ]
          },
          reject_kind: {
            npc: ["Appreciate the honesty.","We can't take you right now, but here's a free tip — ship one tiny thing publicly. Then DM me.","Good luck."],
            end: 'ghosted'
          },
          reject: {
            npc: ["Got it. Best of luck."],
            end: 'failed'
          },
          real_eng: {
            npc: ["Good answer.","Coding interview Tuesday at 10am. Two algorithms questions, one system design.","Sound good?"],
            options: [
              { text: "Tuesday works.", next: 'offer' },
              { text: "Can we skip the algo questions?", next: 'reject' },
            ]
          },
          real_pm: {
            npc: ["Good — you actually understand the work.","Onsite next week. Real expectations, real comp, real outcomes.","Want to interview?"],
            options: [
              { text: "Absolutely.", next: 'offer' },
              { text: "Send me details first.", next: 'offer' },
            ]
          },
          offer: {
            npc: ["You did well.","Offer in your inbox: senior role, $280K base, 0.4% equity, real PTO.","Welcome to the team. Don't make me regret this."],
            end: 'success'
          },
        }
      }
    },

    // ── 15. EMILY CARTRIDGE — Tradwife trying to monetize being a wife. ─
    {
      id: 15, name: 'Emily Cartridge', tagline: 'Tradwife • Sourdough Mama • Anti-Modern', emoji: '🧺',
      bio: "Stay-at-home wife. I make sourdough at 5am and submit to my husband at 5pm. Currently building a personal brand around 'returning to femininity.' My husband makes $400K a year — irrelevant.",
      prompt: { q: "I'm looking for", a: "a partner I can submit to (or a sponsor for my $300 raw milk reels)" },
      funFacts: [
        "I do not work but I am 'busy' all day",
        "My 'business' is filming myself making bread",
        "I deleted my college degree from LinkedIn (it's empowering)",
      ],
      interests: ['Sourdough','Raw Milk','Dressing Modestly','Submission','Blue Aprons'],
      experience: [
        { role: 'Homemaker',  company: 'My God-given role',  icon: '🏡' },
        { role: 'Wife',       company: 'My husband',          icon: '💍' },
        { role: 'Influencer', company: 'Instagram @TradLife', icon: '📸' },
      ],
      posts: [
        { time: '5h', text: "Up at 4am to feed my sourdough starter, milk the goat (rented), and prepare my husband's lunch.\n\nThis is what fulfillment looks like. Not a 'career.' Not 'independence.' THIS. 🌾\n\n(Brand partnerships: emily@tradlifeagency.co)",
          likes: 14502, reposts: 2105 },
      ],
      comments: [
        { author: 'Real Tradwife',      text: 'You inspire me ❤️', neg: false },
        { author: 'Suspicious Internet', text: 'Babe you have a digital marketing degree from NYU', neg: true },
      ],
      requirements: { looks: 5, charisma: 2, smarts: 0, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello! 🌾","I have to ask first — are you a man?"],
            options: [
              { text: "Yes.", next: 'tradask' },
              { text: "No.", next: 'fem_reject' },
              { text: "Why does it matter?", next: 'fem_reject' },
            ]
          },
          fem_reject: {
            npc: ["I only network with men. Women should be at home.","God bless 🙏"],
            end: 'failed'
          },
          tradask: {
            npc: ["Wonderful 🌾","I have a brand collaboration opportunity for my Instagram @TradLife.","Are you in modest fashion, raw dairy, or anti-feminism content?"],
            options: [
              { text: "I'm actually looking for a job.", next: 'pivot_brand' },
              { text: "Sure, tell me about the collab.", next: 'collab' },
              { text: "What's anti-feminism content?", next: 'reveal' },
            ]
          },
          pivot_brand: {
            npc: ["A 'job'? Why aren't you supporting your wife instead?","Let me introduce you to my husband's MLM.","He sells cigars."],
            options: [
              { text: "Sure, introduce us.", next: 'cigars' },
              { text: "Hard pass.", next: 'reject' },
            ]
          },
          reveal: {
            npc: ["You know — getting women back in their God-given roles 🌾","Some say 'culty' but I say 'biblical' 🌾🌾"],
            options: [
              { text: "Yeah this isn't for me.", next: 'reject' },
              { text: "Tell me more.", next: 'collab' },
            ]
          },
          collab: {
            npc: ["I need someone to invest in my $4,997 'Become A Tradwife' course relaunch","You'd get 5% revenue for life","(There will be no revenue.)"],
            options: [
              { text: "I'll invest!", next: 'scammed' },
              { text: "Pass.", next: 'reject' },
            ]
          },
          cigars: {
            npc: ["Wonderful! He'll DM you.","(He won't. He's at the firm. Until 11pm. Every night.)"],
            end: 'ghosted'
          },
          reject: {
            npc: ["I'll pray for you 🌾"],
            end: 'ghosted'
          },
          scammed: {
            npc: ["Praise! 🌾🌾🌾","Sending you the wire instructions. No refunds.","God bless your investment 💸"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 16. STEVEN HORN — Real estate guru. House flipping scam king. ───
    {
      id: 16, name: 'Steven Horn', tagline: 'Real Estate Mogul • $40M in Doors • Coach', emoji: '🏘️',
      bio: "Bought my first house at 19 with no money down (used dad's signature). Now I run a 'masterclass' teaching others to do the same. The economy doesn't apply to me.",
      prompt: { q: "Stop me before I", a: "tell you about my $999 'No Money Down' webinar (it's free for the first 100 people)" },
      funFacts: [
        "My 'portfolio' is mostly photos of houses I don't own",
        "I rented a Lamborghini for the day to film a 'hustle' reel",
        "I have been sued by 4 students in 2 years",
      ],
      interests: ['Real Estate','Lamborghinis (Rented)','Gurus','Pyramid Schemes','Yelling at Camera'],
      experience: [
        { role: 'Founder',  company: 'Horn Real Estate Academy',  icon: '🏠' },
        { role: 'Coach',    company: 'My Mastermind ($25K/yr)',    icon: '👑' },
        { role: 'Investor', company: 'Allegedly',                  icon: '💸' },
      ],
      posts: [
        { time: '8h', text: "I'M GIVING AWAY $0 DOWN REAL ESTATE SECRETS!!!\n\nFREE WEBINAR (then $999, then $4,997 mastermind, then $25K coaching, then I steal your soul)\n\nDM 'WEALTH' — the first 100 only!!! (it will be open forever)",
          likes: 678, reposts: 142 },
      ],
      comments: [
        { author: 'Kyle Hustler',    text: 'Bought your course brother CHANGED MY LIFE 🔥', neg: false },
        { author: 'Sued You In 2023', text: 'I lost $80K because of this man', neg: true },
      ],
      requirements: { looks: 3, charisma: 4, smarts: 0, networking: 1, nepotism: 2 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["YO BROTHER","you ready to LEVEL UP","you ready to BUY YOUR FIRST DOOR with NO MONEY"],
            options: [
              { text: "Yes! Tell me more!", next: 'pitch' },
              { text: "Are you offering a job or a course?", next: 'reveal' },
              { text: "Hard pass on whatever this is.", next: 'reject' },
            ]
          },
          reveal: {
            npc: ["both 😤","i'll teach you and you'll WORK FOR ME closing deals","fee is just $4,997 to start — refundable (lie)"],
            options: [
              { text: "Sounds great, sign me up!", next: 'scammed' },
              { text: "I want a job, not to pay you.", next: 'pitch_again' },
            ]
          },
          pitch: {
            npc: ["LFG","mastermind is $25K","you'll make it back in your first deal (you won't)","CARDS OUT"],
            options: [
              { text: "I'm in!", next: 'scammed' },
              { text: "$25K?? No.", next: 'pitch_again' },
            ]
          },
          pitch_again: {
            npc: ["okay okay just $999 starter pack then","one PDF and a Discord","do it brother"],
            options: [
              { text: "Fine, $999.", next: 'scammed' },
              { text: "Still no.", next: 'reject' },
            ]
          },
          reject: {
            npc: ["BROKE MINDSET 😤","UNFOLLOW","manifesting your bankruptcy 💸"],
            end: 'failed'
          },
          scammed: {
            npc: ["LFGGGGGG 🔥🔥","ZELLE ME RIGHT NOW","welcome to the family bro (you're not in the family)"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 17. PROFESSOR EUGENE FARTHINGSWORTH — Dying tenured prof. ───────
    {
      id: 17, name: 'Prof. Eugene Farthingsworth', tagline: 'Tenured Professor • Bow Tie Enthusiast', emoji: '🎓',
      bio: "Tenured professor of Comparative Literature since 1987. I have not updated my syllabus in 30 years. My students hate me. I do not care. I will die in this office.",
      prompt: { q: "Way to my heart", a: "correctly cite a 19th century French critic in casual conversation" },
      funFacts: [
        "I have 4 published books, sold 47 copies total",
        "I bring my own typewriter to faculty meetings",
        "I once made a student cry by calling their thesis 'aggressively pedestrian'",
      ],
      interests: ['Footnotes','Pipe Tobacco','Disdain','Marginalia','Latin Phrases'],
      experience: [
        { role: 'Tenured Professor', company: 'Liberal Arts College',  icon: '📜' },
        { role: 'Visiting Scholar',  company: 'Oxford (one summer)',    icon: '🎩' },
        { role: 'Author',            company: '4 unread monographs',    icon: '📖' },
      ],
      posts: [
        { time: '3d', text: "My students complained that 1,200 pages of reading 'per week' is excessive.\n\nI told them I read more in a single Sunday afternoon as a child.\n\nThey reported me to the Dean. The Dean is younger than my favorite blazer. I will not be retiring.",
          likes: 14, reposts: 0 },
      ],
      comments: [
        { author: 'Former Student',  text: 'This man ruined my GPA and self-esteem', neg: true },
        { author: 'Anonymous Dept.', text: 'Eugene please update the syllabus', neg: true },
      ],
      requirements: { looks: 1, charisma: 1, smarts: 5, networking: 1, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Greetings.","Have you read Foucault in the original French?"],
            options: [
              { text: "No, but I've read translations.", next: 'sneer' },
              { text: "Yes, both volumes.", next: 'impressed' },
              { text: "I haven't, sorry.", next: 'sneer' },
            ]
          },
          sneer: {
            npc: ["Translations are crutches for the unserious.","I'm afraid we're not aligned.","Good day."],
            end: 'failed'
          },
          impressed: {
            npc: ["Astonishing.","Tell me — what is your view on the late Derrida?"],
            options: [
              { text: "His later work is more accessible than his early.", next: 'maybe_offer' },
              { text: "Honestly I find him insufferable.", next: 'death' },
              { text: "Could I please ask about a job?", next: 'sneer' },
            ]
          },
          death: {
            npc: ["INSUFFERABLE.","Madam/sir — you are as crude as my undergraduates.","Good DAY."],
            end: 'failed'
          },
          maybe_offer: {
            npc: ["Astute.","I have a research assistant position. Pay is dreadful — $14/hour.","You will type my manuscripts on a typewriter. Yes, a typewriter."],
            options: [
              { text: "I'll take it!", next: 'offer' },
              { text: "$14/hour? On a typewriter?", next: 'sneer' },
            ]
          },
          offer: {
            npc: ["Splendid.","Begin Monday. Bring no electronics. They corrupt the mind.","Welcome aboard."],
            end: 'success'
          },
        }
      }
    },

    // ── 18. CRYSTAL MOON — Astrologer who is also somehow your HR rep. ──
    {
      id: 18, name: 'Crystal Moon', tagline: 'HR Manager • Astrologer • Empath', emoji: '🌙',
      bio: "I'm an HR manager by day, witch by night. I bring my crystals into the office. I will read your birth chart before approving your PTO. Mercury is always in retrograde and so is your performance review.",
      prompt: { q: "I get along best with", a: "Pisces, Libras, and people who don't ask too many questions about my management style" },
      funFacts: [
        "I write meeting agendas using the lunar calendar",
        "I once denied a raise because the candidate was 'too Capricorn'",
        "I cleansed the entire office with sage during Q4 layoffs",
      ],
      interests: ['Astrology','Tarot','HR Compliance','Crystal Energy','Workplace Mediation'],
      experience: [
        { role: 'HR Manager',  company: 'Some Tech Company', icon: '🌙' },
        { role: 'Reiki Master', company: 'Self-certified',    icon: '✨' },
      ],
      posts: [
        { time: '1d', text: "Just finished interviewing 12 candidates today. I made my decisions based on:\n\n— Their rising sign (40%)\n— Their resume (10%)\n— My vibes (50%)\n\nWe HIGHLY value 'culture fit' which is just my polite word for 'astrological compatibility' ✨🔮",
          likes: 89, reposts: 5 },
      ],
      comments: [
        { author: 'Coworker A', text: 'Crystal please stop pulling tarot during 1:1s', neg: true },
        { author: 'Believer',   text: 'She read my chart it was actually accurate 😳', neg: false },
      ],
      requirements: { looks: 2, charisma: 3, smarts: 2, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi sweet soul ✨","Before we go further — what's your sun sign?"],
            options: [
              { text: "Aries.", next: 'badsign' },
              { text: "Pisces.", next: 'goodsign' },
              { text: "I don't know mine.", next: 'gentle' },
              { text: "Astrology is fake.", next: 'instabad' },
            ]
          },
          instabad: {
            npc: ["…","Wow.","I'll be flagging this conversation in your permanent file (not really, but I want to)","Goodbye."],
            end: 'failed'
          },
          badsign: {
            npc: ["Hmm.","Aries energy is incompatible with our Q3 vibes.","I'm afraid we're not a fit. The stars have spoken. 🔮"],
            end: 'ghosted'
          },
          goodsign: {
            npc: ["A PISCES ✨","Sister.","I have a job for you. We'll skip the panel interview — your chart is enough."],
            options: [
              { text: "Sounds amazing!", next: 'offer' },
              { text: "Wait — don't I need an actual interview?", next: 'doubt' },
            ]
          },
          gentle: {
            npc: ["Oh! Send me your birth date, time, and city — I'll do a quick chart 🔮"],
            options: [
              { text: "Sure, here it is.", next: 'verdict' },
              { text: "I'd rather just talk about the role.", next: 'badsign' },
            ]
          },
          verdict: {
            npc: ["Reading your chart…","✨ Very interesting…","You have a Mars in Capricorn — that means you're ambitious AND grounded.","I think you're hired."],
            end: 'success'
          },
          doubt: {
            npc: ["The stars are the interview, sweet soul ✨","If you don't trust the cosmos, I can't trust you."],
            end: 'ghosted'
          },
          offer: {
            npc: ["Welcome to the team! 🔮","Onboarding starts on the new moon (next Tuesday)","Bring an open heart and a notarized birth certificate."],
            end: 'success'
          },
        }
      }
    },

    // ── 19. BARRY OPTIMIST — Toxic positive motivational speaker. ───────
    {
      id: 19, name: 'Barry Optimist', tagline: 'Motivational Speaker • Author • Living Legend', emoji: '😁',
      bio: "I haven't had a bad day since 2009. If you have a 'bad day' it's because you CHOSE to. Author of '17 Reasons Your Sadness Is Your Fault.' Hire me to scream affirmations at your team for $40K.",
      prompt: { q: "I'm convinced that", a: "happiness is a CHOICE and your depression is just bad attitude (don't @ me)" },
      funFacts: [
        "I have NEVER missed a day of journaling. NEVER.",
        "I high-five my reflection every morning",
        "My wife left me. I journaled it as an OPPORTUNITY.",
      ],
      interests: ['Affirmations','Vision Boards','Pep Talks','Tony Robbins','Pretending To Be Fine'],
      experience: [
        { role: 'Motivational Speaker', company: 'Self-employed',  icon: '🎤' },
        { role: 'Author',               company: '8 books on Kindle Unlimited', icon: '📚' },
        { role: 'Coach',                company: 'High-performers (allegedly)',  icon: '⚡' },
      ],
      posts: [
        { time: '4h', text: "TODAY IS A GIFT 🎁\n\nYou woke up. THAT'S A WIN. Your heart is beating. THAT'S A WIN. You can read this. THAT'S A WIN.\n\nIf you can't find joy in THESE THINGS, maybe the problem is YOU. 💪💪💪\n\n(Inquiries about my $5K speaking fee in my DMs.)",
          likes: 4502, reposts: 891 },
      ],
      comments: [
        { author: 'TonyFanboy',    text: "Barry you're CHANGING LIVES brother", neg: false },
        { author: 'Tired Person',  text: 'My therapist hates this guy', neg: true },
      ],
      requirements: { looks: 2, charisma: 5, smarts: 1, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["WHAT'S UP CHAMPION?? 💪","HOW IS YOUR DAY GOING??","BE HONEST"],
            options: [
              { text: "AMAZING! Thanks for asking!", next: 'love' },
              { text: "Honestly kind of rough today.", next: 'lecture' },
              { text: "It's fine, why?", next: 'lecture' },
            ]
          },
          lecture: {
            npc: ["WRONG ANSWER 💪","TODAY IS A GIFT","Your 'rough day' is a CHOICE","Re-frame it. RIGHT NOW."],
            options: [
              { text: "Okay, you're right, today IS a gift!", next: 'love' },
              { text: "Dude that's not how mental health works.", next: 'instabad' },
            ]
          },
          instabad: {
            npc: ["NEGATIVE ENERGY DETECTED ❌","I cannot align with toxicity (mine is fine)","UNFOLLOW + BLOCK"],
            end: 'failed'
          },
          love: {
            npc: ["YESSSS 💪💪💪","I'M HIRING A 'JOY EXECUTIVE'","Your job: scream affirmations at me when I'm sad (which is never, allegedly)","60 hours, $35K"],
            options: [
              { text: "I'll take it!", next: 'offer' },
              { text: "$35K for 60 hours?", next: 'lecture' },
            ]
          },
          offer: {
            npc: ["LET'S GO CHAMPION 💪","Sending the offer letter","FIRST TASK: Write me 100 reasons today is amazing"],
            end: 'success'
          },
        }
      }
    },

    // ── 20. JADYN LOWERCASE — gen alpha intern who terrifies you. ───────
    {
      id: 20, name: 'jadyn lowercase', tagline: 'intern at meta • 19 • genuinely scary', emoji: '🌀',
      bio: "i am 19 and have been on the internet since i was 4. i've already invented two slang terms you don't understand. i make $200k a year as an intern. terrifying you is my passion.",
      prompt: { q: "i go crazy for", a: "boomers trying to use slang. it activates something primal in me 🥲" },
      funFacts: [
        "i have started an llc but i don't know what an llc is",
        "i've been canceled twice — once at 12, once at 17",
        "i unironically say 'rizz' at work and my manager has never recovered",
      ],
      interests: ['Tiktok','Tiktok','Tiktok','Tiktok','Touch grass'],
      experience: [
        { role: 'Intern',          company: 'Meta ($200K/yr)',  icon: '💸' },
        { role: 'Ghostwriter',     company: 'Gen Z creators',    icon: '👻' },
        { role: 'Founder',         company: 'a thing on TikTok', icon: '🌀' },
      ],
      posts: [
        { time: '20m', text: "millennials try to be 'mentors' but they don't even know what skibidi means 🥲 i can't be coached by someone who still says 'lol' fr",
          likes: 38201, reposts: 5703 },
      ],
      comments: [
        { author: 'gen z mass',   text: 'jadyn you ATE 🔥', neg: false },
        { author: 'every boomer', text: 'In MY day…', neg: true },
      ],
      requirements: { looks: 3, charisma: 3, smarts: 3, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["yo","quick vibe check","what's the rizz situation"],
            options: [
              { text: "I have rizz, of course.", next: 'pass1' },
              { text: "I don't really know what that means.", next: 'cooked' },
              { text: "I'm too old for this.", next: 'cooked' },
            ]
          },
          cooked: {
            npc: ["sir/ma'am","you are cooked","💀💀💀"],
            end: 'failed'
          },
          pass1: {
            npc: ["okay you might survive","second test","explain skibidi in one sentence"],
            options: [
              { text: "It's a TikTok meme about toilets and characters.", next: 'pass2' },
              { text: "Honestly no idea.", next: 'cooked' },
            ]
          },
          pass2: {
            npc: ["respectable","final test","are you mid or based"],
            options: [
              { text: "Based.", next: 'job' },
              { text: "Mid, probably.", next: 'cooked' },
              { text: "Stop torturing me.", next: 'cooked' },
            ]
          },
          job: {
            npc: ["okay","you passed 🥹","i need someone to translate gen z slang for the 40+ executives at my company","$80k. easy gig."],
            options: [
              { text: "I'll take it.", next: 'offer' },
              { text: "Are you actually allowed to hire me?", next: 'real' },
            ]
          },
          real: {
            npc: ["i'm 19 and an intern","but my manager is so scared of me he'll approve anything","trust"],
            options: [
              { text: "Sure, let's do it.", next: 'offer' },
              { text: "This sounds illegal.", next: 'reject' },
            ]
          },
          reject: {
            npc: ["okay narc","didn't realize you were that mid","l + ratio + ghosted"],
            end: 'ghosted'
          },
          offer: {
            npc: ["bet 🥹","sending the offer letter","first task: explain 'rizz' to dave from finance"],
            end: 'success'
          },
        }
      }
    },

    // ── 21. CHAD GIGAVOLTAGE — Crypto bro. Permanently HODLing. ─────────
    {
      id: 21, name: 'Chad Gigavoltage', tagline: 'Crypto Pioneer • DeFi Degen • Diamond Hands 💎🙌', emoji: '💎',
      bio: "Bought BTC at $4 and sold at $6. Bought BTC at $60K and HODLed to $16K. Currently 'extremely liquid' (broke). NFTs ARE coming back trust me.",
      prompt: { q: "Don't hate me if I", a: "explain blockchain to you using the 'pizza analogy' for the eighth time tonight" },
      funFacts: [
        "i lost $400k on a dog coin and called it a 'tax write-off'",
        "I have 47 cold wallets and remember the seed phrase to 0",
        "I bought a Bored Ape and now I cannot afford rent",
      ],
      interests: ['Bitcoin','Ethereum','NFTs','Yield Farming','Bagholding'],
      experience: [
        { role: 'Founder',  company: 'Three rugged DeFi protocols', icon: '💎' },
        { role: 'Investor', company: 'Several Ponzi schemes',         icon: '📉' },
        { role: 'Trader',   company: 'My Discord server',             icon: '💬' },
      ],
      posts: [
        { time: '2h', text: "GUYS. THE BULL RUN IS HERE. (This is my 47th time saying this.)\n\nThe charts don't lie. Wave 5 of Elliott Wave on the macro. Stochastic RSI is bottoming. Whale wallets are accumulating.\n\nBitcoin to $1M by EOY. Take this seriously. (Or don't. NFA. DYOR. WAGMI.)",
          likes: 1842, reposts: 412 },
      ],
      comments: [
        { author: 'WAGMI_Bro',     text: 'LFG KING 💎🙌', neg: false },
        { author: 'Person Burned', text: 'I bought your shit coin and it went to zero', neg: true },
      ],
      requirements: { looks: 2, charisma: 3, smarts: 2, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["gm","gm","gm","you bullish or bearish"],
            options: [
              { text: "Bullish.", next: 'maybe' },
              { text: "Bearish.", next: 'reject' },
              { text: "Crypto is mostly scams.", next: 'mad' },
            ]
          },
          mad: {
            npc: ["NGMI","you don't get it","you'll be working a 9-5 forever","🚫 BLOCKED"],
            end: 'failed'
          },
          reject: {
            npc: ["pfffft normie","enjoy your fiat dust","gl"],
            end: 'ghosted'
          },
          maybe: {
            npc: ["BASED","i'm hiring at my new project","it's a meme coin called $JOBLESS","you'll be paid in $JOBLESS"],
            options: [
              { text: "What's the USD value?", next: 'real_money' },
              { text: "Sure, sounds great!", next: 'rugged' },
            ]
          },
          real_money: {
            npc: ["bro","fiat is for cucks","you don't UNDERSTAND if you ask that","i'll give you 10M $JOBLESS","that's worth $0.04 right now but TRUST"],
            options: [
              { text: "I'm in.", next: 'rugged' },
              { text: "I need actual money.", next: 'reject' },
            ]
          },
          rugged: {
            npc: ["LFG 💎🙌","welcome to the protocol","actually","brb the dev just rugged us","ngmi","(he ghosts you. forever.)"],
            end: 'ghosted'
          },
        }
      }
    },

    // ── 22. SUSAN SNYDER — Old guard PR exec. Will hire you for free. ───
    {
      id: 22, name: 'Susan Snyder', tagline: 'PR Maven • 30 Years Experience • Glass Ceiling Survivor', emoji: '💋',
      bio: "I was breaking into PR when you were in diapers. I've handled crises for 4 sitting senators. I will pay you $14/hour because I had it WORSE.",
      prompt: { q: "Most spontaneous thing I've done", a: "fired an intern for asking about 'work-life balance' (I had to look up what that meant)" },
      funFacts: [
        "I have been at the same firm since 1994",
        "My desktop wallpaper is a fax machine",
        "I have made 47 women cry at this firm and call them 'too sensitive'",
      ],
      interests: ['Damage Control','Cocktail Hours','Smoking Indoors','Faxing','Dismissing Younger Generations'],
      experience: [
        { role: 'Senior Partner', company: 'Snyder & Associates', icon: '💋' },
        { role: 'Partner',        company: 'Snyder & Associates', icon: '💋' },
        { role: 'Associate',      company: 'Snyder & Associates', icon: '💋' },
      ],
      posts: [
        { time: '2d', text: "When I started in PR I worked 80 hours a week, slept under my desk, and was harassed daily.\n\nKids today complain about 'burnout.'\n\nWE INVENTED BURNOUT. GET TO WORK.",
          likes: 312, reposts: 58 },
      ],
      comments: [
        { author: 'Linda Boomer',     text: 'AMEN Susan. Kids today have it too easy.', neg: false },
        { author: 'Anonymous Intern', text: 'Susan you screamed at me for using a comma wrong', neg: true },
      ],
      requirements: { looks: 3, charisma: 3, smarts: 2, networking: 4, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello there.","Tell me about your work ethic.","No buzzwords."],
            options: [
              { text: "I work hard and ship results.", next: 'maybe' },
              { text: "I value work-life balance.", next: 'rage' },
              { text: "I'm a self-starter and team player.", next: 'sneer' },
            ]
          },
          rage: {
            npc: ["I asked for no buzzwords.","'Work-life balance.'","Get out of my inbox."],
            end: 'failed'
          },
          sneer: {
            npc: ["Buzzword vomit.","Rejected."],
            end: 'failed'
          },
          maybe: {
            npc: ["Acceptable.","I'm hiring an associate. $42K. 65-hour weeks. No remote.","Are you committed?"],
            options: [
              { text: "Yes.", next: 'final' },
              { text: "$42K is below market…", next: 'rage_money' },
              { text: "Could it be hybrid?", next: 'rage_remote' },
            ]
          },
          rage_money: {
            npc: ["I made $19K my first year.","Adjusted for inflation that's $42K. Stop complaining."],
            options: [
              { text: "Fine, I'll take it.", next: 'final' },
              { text: "Inflation doesn't work that way.", next: 'rage' },
            ]
          },
          rage_remote: {
            npc: ["'Hybrid.'","Are you a serious person."],
            end: 'failed'
          },
          final: {
            npc: ["Good.","Start Monday at 7am. Bring your own laptop. We don't pay for those.","Welcome to the firm."],
            end: 'success'
          },
        }
      }
    },

    // ── 23. PIETER VAN DER MAAS — Dutch consultant. Ruthlessly direct. ──
    {
      id: 23, name: 'Pieter van der Maas', tagline: 'Strategy Partner @ McKinsey • Direct', emoji: '🇳🇱',
      bio: "Dutch. Direct. I will tell you exactly what I think of your work and you will not enjoy it. Ex-McKinsey, current McKinsey, future McKinsey. I have been at McKinsey for 23 years and have not had a meaningful conversation in any of them.",
      prompt: { q: "I want to hear", a: "your opinion stated bluntly. Cushioning is a waste of my time." },
      funFacts: [
        "I have made 4 partners cry in their reviews",
        "I review my child's homework using a 2x2 matrix",
        "I once described my own wedding as 'an underwhelming initiative'",
      ],
      interests: ['Frameworks','PowerPoint','Cycling','Stroopwafels','Saying What You Mean'],
      experience: [
        { role: 'Senior Partner', company: 'McKinsey & Co (23 yrs)', icon: '🇳🇱' },
      ],
      posts: [
        { time: '1d', text: "American business culture: 'How are you?' followed by lying.\n\nDutch business culture: 'Your slide is bad and so is your hairstyle.'\n\nGuess which one ships faster.",
          likes: 4502, reposts: 891 },
      ],
      comments: [
        { author: 'Ex-McK',       text: 'Pieter destroyed my will to live and I thank him for it', neg: false },
        { author: 'Junior Cons.', text: 'He literally called my deck "embarrassing" in front of the whole team', neg: true },
      ],
      requirements: { looks: 1, charisma: 1, smarts: 5, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Tell me one weakness. Real one.","I will know if you lie."],
            options: [
              { text: "I work too hard. (Classic.)", next: 'fake' },
              { text: "I get defensive when criticized.", next: 'real' },
              { text: "I struggle to delegate.", next: 'fake' },
            ]
          },
          fake: {
            npc: ["That is a fake answer.","You are not honest. We cannot work together."],
            end: 'failed'
          },
          real: {
            npc: ["Acceptable. Most do not say this.","Good. Honesty is the floor.","Tell me a project you led that failed."],
            options: [
              { text: "Honestly, I haven't led a real project.", next: 'real2' },
              { text: "We launched a product that flopped — here's what I learned.", next: 'real3' },
              { text: "I haven't really failed.", next: 'fake' },
            ]
          },
          real2: {
            npc: ["Honest again. Surprising.","I will take a chance on you."],
            options: [
              { text: "Thank you.", next: 'offer' },
            ]
          },
          real3: {
            npc: ["Good. You learn from failure. Most cannot."],
            options: [
              { text: "Thanks.", next: 'offer' },
            ]
          },
          offer: {
            npc: ["Offer letter Friday.","I will be very direct with you. You will hate it for one year, love it for ten.","Welcome."],
            end: 'success'
          },
        }
      }
    },

    // ── 24. CINDY-LOU PERIWINKLE — Pinterest mom influencer. ────────────
    {
      id: 24, name: 'Cindy-Lou Periwinkle', tagline: 'Stay-At-Home Aesthetic 🤍 Lifestyle Blogger', emoji: '🤍',
      bio: "Wife. Mom of 4 (named Banks, Jaxon, Saylor, and Honor). Aesthetic minimalist. My entire house is beige. My children are also beige. Brand collabs: cindylou@beigemom.co",
      prompt: { q: "If loving this is wrong", a: "labeling everything in my pantry, including the labels themselves, then I don't want to be right" },
      funFacts: [
        "I have removed every primary color from my home",
        "My kids have only ever worn linen",
        "I 'meal prep' but it's just 7 identical bowls of beige",
      ],
      interests: ['Minimalism','Linen','Beige','Sourdough','Aesthetic Boards'],
      experience: [
        { role: 'Lifestyle Blogger',   company: '@BeigeMomLife (1.2M followers)', icon: '🤍' },
        { role: 'Brand Ambassador',    company: 'Linen company',                   icon: '🛏️' },
      ],
      posts: [
        { time: '6h', text: "Today's slow morning ✨🤍\n\n— Wake up to my husband's perfect cappuccino\n— Spend 4 hours arranging linens by shade\n— Quietly judge other mothers\n— Repeat\n\nThis is what slow living looks like.\n\n(Sponsored by 'Quietly Aesthetic Beige Co' — code BEIGE for 10% off)",
          likes: 18402, reposts: 2103 },
      ],
      comments: [
        { author: 'Aesthetic Mom',    text: 'You inspire me daily 🤍🤍', neg: false },
        { author: 'Real Mom',         text: 'Babe your kids look like they\'re in a Soviet-era catalog', neg: true },
      ],
      requirements: { looks: 5, charisma: 2, smarts: 1, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["hello 🤍","question — what colors are dominant in your home?"],
            options: [
              { text: "Beige and cream, mostly.", next: 'pass' },
              { text: "Bold colors — reds, blues.", next: 'horror' },
              { text: "I rent so it doesn't matter.", next: 'horror' },
            ]
          },
          horror: {
            npc: ["…","I'm so sorry","I hope you find healing 🤍"],
            end: 'ghosted'
          },
          pass: {
            npc: ["A kindred spirit 🤍","I'm hiring an aesthetic curator","Your job: re-organize my pantry by shade for 6 hours/week","$18/hour, paid in linen samples"],
            options: [
              { text: "I'd love that.", next: 'offer' },
              { text: "Paid in linen?", next: 'horror' },
            ]
          },
          offer: {
            npc: ["Beautiful 🤍","Send me a photo of your hands. They must match the brand aesthetic.","(She is serious.)"],
            end: 'success'
          },
        }
      }
    },

    // ── 25. STAN HENDERSON — Bitter middle manager who hates everyone. ──
    {
      id: 25, name: 'Stan Henderson', tagline: 'Regional Manager • Will Retire Before Promoting You', emoji: '👴',
      bio: "Regional manager at a corporation you've never heard of. I've been here 27 years. I have not had an original thought since 2003. My favorite phrase is 'that's not how we do things here.'",
      prompt: { q: "I'm a sucker for", a: "people who say 'circle back' and 'touch base' in the same sentence" },
      funFacts: [
        "I have a print-out of every email I've ever sent",
        "I require my team to come to the office '5 days a week, no exceptions' (I work 3)",
        "My idea of 'culture' is a quarterly pizza party",
      ],
      interests: ['Excel','Cubicles','Pizza Parties','HR Compliance','Resenting Younger Hires'],
      experience: [
        { role: 'Regional Manager', company: 'GenericCorp (27 yrs)', icon: '🏢' },
      ],
      posts: [
        { time: '4d', text: "Reminder: you will NOT advance in your career without IN-PERSON facetime with leadership.\n\n(I am 'leadership.' I work from home Tuesdays, Wednesdays, and Fridays. The juniors are required in 5 days.)",
          likes: 432, reposts: 28 },
      ],
      comments: [
        { author: 'Boomer Coworker', text: 'Spot on Stan! Gen Z needs to learn this!', neg: false },
        { author: 'Anonymous Empl.', text: 'Stan hasn\'t been in the office on a Friday since 2017', neg: true },
      ],
      requirements: { looks: 1, charisma: 1, smarts: 2, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Tell me — would you 'circle back' or 'touch base' on a project?"],
            options: [
              { text: "Both, depending on context.", next: 'pass' },
              { text: "I'd just send the update directly.", next: 'angry' },
              { text: "Those phrases are corporate clichés.", next: 'instakill' },
            ]
          },
          instakill: {
            npc: ["Excuse me?","'Clichés.'","This conversation is over."],
            end: 'failed'
          },
          angry: {
            npc: ["Direct? Without 'aligning' first?","Reckless. Not how we do things here."],
            end: 'failed'
          },
          pass: {
            npc: ["Acceptable.","I have an Associate Coordinator role. $48K. In-office 5 days. 'Fast-paced.'","Can you handle that?"],
            options: [
              { text: "Yes.", next: 'check' },
              { text: "Is there room for growth?", next: 'lie' },
              { text: "Why 5 days when you work 3?", next: 'instakill' },
            ]
          },
          lie: {
            npc: ["Plenty of room. Lots of opportunity.","(There is none. He has been here 27 years.)"],
            options: [
              { text: "Sounds good.", next: 'check' },
            ]
          },
          check: {
            npc: ["One last thing. Rate yourself 1-10 on 'team player.'"],
            options: [
              { text: "10. Total team player.", next: 'offer' },
              { text: "8. Honest answer.", next: 'angry' },
            ]
          },
          offer: {
            npc: ["Fantastic.","Welcome to GenericCorp. The next 27 years will fly by.","(They will not.)"],
            end: 'success'
          },
        }
      }
    },

    // ── 26. NICOLE SHARDLAKE — Therapist who pathologizes everything. ───
    {
      id: 26, name: 'Nicole Shardlake, MA, LCSW', tagline: 'Therapist • Trauma Coach • Boundary Queen', emoji: '🛋️',
      bio: "Licensed therapist specializing in 'modern adulthood.' I will diagnose you within 30 seconds. You ARE the toxic one. Your boss IS a narcissist. Your friends ARE love-bombing you. Trust me.",
      prompt: { q: "First round is on me if", a: "you can describe a normal disagreement without using the word 'gaslighting'" },
      funFacts: [
        "I have called my own mother a 'narcissist' on TikTok 47 times",
        "I bill $300/hour and use the word 'attachment style' incorrectly",
        "I have unlicensed-diagnosed three of my Tinder dates",
      ],
      interests: ['Attachment Theory','Polyvagal Theory','Jungian Shadow Work','Diagnosing Strangers','Boundaries'],
      experience: [
        { role: 'Private Practice',  company: 'Nicole Shardlake Therapy', icon: '🛋️' },
        { role: 'TikTok Therapist',  company: '@TheBoundaryQueen',        icon: '📱' },
      ],
      posts: [
        { time: '8h', text: "Reminder: just because someone is YOUR PARENT doesn't mean you have to FORGIVE them.\n\nIs your dad a complicated man with his own pain? Maybe. But have you tried CUTTING HIM OFF? Because that's what I'd recommend.\n\n(Get my $200 'Estranged & Free' workbook in bio.)",
          likes: 28402, reposts: 4503 },
      ],
      comments: [
        { author: 'Healing Hannah',  text: 'BIBLE. Cut him off. 🙏', neg: false },
        { author: 'Actual Therapist',text: 'Nicole this is not how therapy works please stop', neg: true },
      ],
      requirements: { looks: 2, charisma: 4, smarts: 2, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi! 🛋️","Tell me about your relationship with your father."],
            options: [
              { text: "It's complicated but generally good.", next: 'pathologize' },
              { text: "Why are we starting there?", next: 'pathologize' },
              { text: "Honestly we're not close. He had issues.", next: 'concerned' },
            ]
          },
          pathologize: {
            npc: ["Mhmmmm.","'Complicated.'","Sounds like AVOIDANT ATTACHMENT 🛋️","You should cut him off. Trust me."],
            options: [
              { text: "I don't think I will.", next: 'offended' },
              { text: "Wait — really?", next: 'sell' },
            ]
          },
          concerned: {
            npc: ["I'm so sorry. That sounds VERY traumatic 🛋️","Have you done EMDR? Polyvagal? Internal family systems?","I have a $4K trauma intensive starting next week."],
            options: [
              { text: "Sounds great, sign me up.", next: 'scammed' },
              { text: "I just wanted to chat about jobs.", next: 'offended' },
            ]
          },
          offended: {
            npc: ["Resistance is part of the journey 🛋️","Coming back to this when you're ready 💗","(NOTE: she's already tagged you as 'unhealed' in her notes.)"],
            end: 'ghosted'
          },
          sell: {
            npc: ["I have a SIX MONTH 'unparent yourself' container","$8,500 — payment plans available","Plus my podcast, plus my journal, plus my course"],
            options: [
              { text: "All of it.", next: 'scammed' },
              { text: "Pass.", next: 'offended' },
            ]
          },
          scammed: {
            npc: ["AMAZING 🛋️","Sending the contract","Welcome to your healing journey (and my income statement)"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 27. RICHARD GUNLINGTON — Paranoid prepper conspiracy guy. ───────
    {
      id: 27, name: 'Richard Gunlington', tagline: 'Survivalist • Patriot • Off-Grid Consultant', emoji: '🪖',
      bio: "I've been preparing for 'the collapse' since 1998. I have 4 years of canned beans and 0 close relationships. Currently selling 'survival mindset coaching' for $300/session.",
      prompt: { q: "Worst idea I've ever had", a: "going on a normal date instead of teaching her to gut a fish (we did not work out)" },
      funFacts: [
        "I have a bunker. I have never let anyone see it.",
        "I have $40K in MREs that will expire before the apocalypse",
        "I once 'corrected' a Whole Foods cashier about civic decay",
      ],
      interests: ['Prepping','Conspiracies','MREs','Tactical Vests','Doomsday Math'],
      experience: [
        { role: 'Survival Coach',     company: 'Self-employed',         icon: '🪖' },
        { role: 'YouTube Personality', company: 'Doom Channel (3K subs)', icon: '📹' },
      ],
      posts: [
        { time: '3h', text: "WAKE UP SHEEPLE.\n\nThe banks will freeze your accounts in 14 days. (I have been saying this for 11 years.) You need:\n\n— 6 months of beans\n— Gold, silver, ammo\n— A plan to leave the city\n— My $300 coaching session\n\nOnly the prepared survive 🪖",
          likes: 1402, reposts: 412 },
      ],
      comments: [
        { author: 'Fellow Prepper', text: 'YEP brother. Stocked up.', neg: false },
        { author: 'His Daughter',   text: 'Dad please call me back', neg: true },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 2, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["What's your current MRE supply at?"],
            options: [
              { text: "I don't have any MREs.", next: 'horror' },
              { text: "About 2 weeks worth.", next: 'maybe' },
              { text: "6 months stockpiled.", next: 'pass' },
            ]
          },
          horror: {
            npc: ["You will be the FIRST to die when it happens.","I cannot work with someone so unprepared. Goodbye."],
            end: 'failed'
          },
          maybe: {
            npc: ["Better than nothing.","Are you trained on a firearm? Have you considered what you'd do when society collapses?"],
            options: [
              { text: "Yes, I'm prepared.", next: 'pass' },
              { text: "Not really.", next: 'sell' },
              { text: "I don't think it's collapsing.", next: 'horror' },
            ]
          },
          pass: {
            npc: ["Brother (or sister).","I'm hiring an apprentice. Cash only. Off-the-books. You'll learn skills they don't teach in school.","$15/hour. We start at 4am."],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "Cash only? That's sketchy.", next: 'horror' },
            ]
          },
          sell: {
            npc: ["You need my $300 'Pre-Collapse Mindset' session.","After that, my $1,200 weekend retreat in the woods.","Then the $4,500 bunker tour."],
            options: [
              { text: "Sign me up.", next: 'scammed' },
              { text: "I'll pass.", next: 'horror' },
            ]
          },
          offer: {
            npc: ["Welcome to the resistance.","First task: dig a hole. I'll explain why later.","(He won't.)"],
            end: 'success'
          },
          scammed: {
            npc: ["GOOD CHOICE.","Cash app me $300. NOW.","See you in the woods at 4am Saturday."],
            end: 'scammed'
          },
        }
      }
    },

    // ── 28. KEVIN PALMS — Tech recruiter who is just a bot in disguise. ─
    {
      id: 28, name: 'Kevin Palms', tagline: 'Tech Recruiter • Building Dream Teams 🚀', emoji: '🤝',
      bio: "Tech recruiter at a 'fast-growing startup.' I will message you daily. I will not read your resume. I will ghost you 4 days into the process every time. You're welcome.",
      prompt: { q: "Don't hate me if I", a: "send you 'great opportunity' DMs at 11pm on a Saturday for the third time this week" },
      funFacts: [
        "I have not actually filled a role in 8 months",
        "I copy/paste the same intro to 200 candidates a day",
        "I confidently use 'rockstar,' 'ninja,' and '10x' in my listings",
      ],
      interests: ['LinkedIn DMs','Generic Pleasantries','Ghosting','Empty Promises','Cold Outreach'],
      experience: [
        { role: 'Senior Recruiter', company: 'A series B startup', icon: '🤝' },
        { role: 'Recruiter',        company: 'A series A startup', icon: '🤝' },
        { role: 'Recruiter',        company: 'A failed startup',    icon: '🤝' },
      ],
      posts: [
        { time: '1h', text: "Hi {{First Name}}, I came across your profile and I'm SO impressed by your background in {{Skill}}!\n\nI have an INCREDIBLE opportunity at a unicorn (won't tell you which one) for a Senior {{Role}}. Comp: 'competitive' (it isn't).\n\n15-min coffee chat?",
          likes: 42, reposts: 4 },
      ],
      comments: [
        { author: 'Annoyed Engineer', text: 'Kevin you have messaged me every Tuesday for 8 months', neg: true },
        { author: 'Other Recruiter',  text: 'Kevin we work AT THE SAME COMPANY please stop messaging me', neg: true },
      ],
      requirements: { looks: 2, charisma: 3, smarts: 1, networking: 4, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi {{First Name}}!","I'm SO impressed by your background.","Are you open to opportunities right now?"],
            options: [
              { text: "Yes! What's the role?", next: 'vague' },
              { text: "Did you read my resume?", next: 'caught' },
              { text: "Can you tell me anything specific?", next: 'caught' },
            ]
          },
          caught: {
            npc: ["Oh — totally yeah I did","You have a great background in… in your field","Anyway, let's chat?"],
            options: [
              { text: "Sure, when?", next: 'vague' },
              { text: "You haven't read it, have you.", next: 'instabad' },
            ]
          },
          instabad: {
            npc: ["Of course I have!","Anyway, gotta jump to another candidate","I'll DM you again Tuesday at 11pm 🚀"],
            end: 'ghosted'
          },
          vague: {
            npc: ["It's a unicorn 🦄","Comp is competitive 💰","Founded by ex-FAANG 🏢","Mission-driven 🌱","Anyway can you do a 30-minute screen this week?"],
            options: [
              { text: "Yes, can you tell me the company name?", next: 'no_name' },
              { text: "Sure, send the invite.", next: 'ghosted_path' },
            ]
          },
          no_name: {
            npc: ["I can't share that until step 3","(I don't actually know what the company is)","Trust me!"],
            options: [
              { text: "Send the invite anyway.", next: 'ghosted_path' },
              { text: "I'll pass.", next: 'instabad' },
            ]
          },
          ghosted_path: {
            npc: ["Great! I'll send the invite EOD","brb on another call","(He's not on a call. He won't send the invite. Ever.)"],
            end: 'ghosted'
          },
        }
      }
    },

    // ── 29. ETHAN CRYBABY — VC bro who 'invests in vibes.' ──────────────
    {
      id: 29, name: 'Ethan Crybaby', tagline: 'Partner @ Some Fund • Investor In Vibes', emoji: '🕶️',
      bio: "Partner at a pre-seed fund (my dad is the LP). I 'invest in founders, not ideas.' I have not done due diligence on a company in 4 years. My portfolio is 90% dogshit.",
      prompt: { q: "I'm convinced", a: "founders should be 'a little autistic' (something I'm not qualified to say but say anyway)" },
      funFacts: [
        "I have never read a balance sheet",
        "I 'invested' in 12 companies and none have raised again",
        "I post a Substack post weekly. 4 people read it.",
      ],
      interests: ['Pre-seed','Pattern Matching','Twitter','Vibes','Pretending To Read Pitch Decks'],
      experience: [
        { role: 'Partner',   company: 'Vibes Capital', icon: '🕶️' },
        { role: 'Principal', company: 'Vibes Capital', icon: '🕶️' },
        { role: 'Analyst',   company: 'Daddy\'s Office', icon: '👔' },
      ],
      posts: [
        { time: '5h', text: "Hot take: pattern matching is underrated.\n\nThe best founders I've backed all have:\n- Started a side project at 12\n- Dropped out of an Ivy\n- Live in SF\n- Are male\n\nIf you don't fit this, don't take it personally. (Take it personally.)",
          likes: 2401, reposts: 312 },
      ],
      comments: [
        { author: 'Other VC Bro', text: 'Spot on Ethan. Quality thread.', neg: false },
        { author: 'Founder',      text: 'Ethan you ghosted my deck for 6 months', neg: true },
      ],
      requirements: { looks: 3, charisma: 3, smarts: 1, networking: 4, nepotism: 3 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey what's the founder energy looking like","gimme a TL;DR of you in 3 emojis"],
            options: [
              { text: "🚀💪🔥", next: 'maybe' },
              { text: "I'm not a founder, I want a job.", next: 'confused' },
              { text: "I refuse to do this.", next: 'instaghost' },
            ]
          },
          instaghost: {
            npc: ["lol cope","not founder mode","🫡"],
            end: 'failed'
          },
          confused: {
            npc: ["wait what","you don't want to RAISE","you want a JOB","i don't really do that","but ok","do you have any 'protocol' or 'agent' in your title"],
            options: [
              { text: "Yes — AI Protocol Engineer.", next: 'maybe' },
              { text: "No, just a regular role.", next: 'instaghost' },
            ]
          },
          maybe: {
            npc: ["okay","i might invest","or hire you i guess","email me your deck","which fund did you say you wanted to raise from again"],
            options: [
              { text: "Yours, Ethan.", next: 'string' },
              { text: "I just want a job, dude.", next: 'instaghost' },
            ]
          },
          string: {
            npc: ["right right","send the deck","i'll review tonight","(he never reviews it)","actually let's get coffee","(he won't)","i'll circle back","(forever)"],
            end: 'ghosted'
          },
        }
      }
    },

    // ── 30. PRIYA RAMAKRISHNAN — Real engineer who hires real people. ───
    {
      id: 30, name: 'Priya Ramakrishnan', tagline: 'Senior Engineering Manager • Boring On Purpose', emoji: '👩‍💻',
      bio: "I manage engineers at a stable mid-size company. We pay competitively, expect 40 hours, and take PTO seriously. We're 'boring' (not boring — sustainable). DM me if you don't want a startup death march.",
      prompt: { q: "I geek out about", a: "PostgreSQL, properly written runbooks, and engineers who use their PTO" },
      funFacts: [
        "Our team has 0% attrition over the past 2 years",
        "I have actually read every report I've signed off on",
        "My team has pizza Friday but we don't call it 'culture'",
      ],
      interests: ['Postgres','Code Reviews','Sustainable Pace','Mentorship','Boring Tech'],
      experience: [
        { role: 'Senior Engineering Manager', company: 'A stable mid-size company', icon: '👩‍💻' },
        { role: 'Tech Lead',                  company: 'Same company',               icon: '👩‍💻' },
        { role: 'Senior Engineer',            company: 'Same company',               icon: '👩‍💻' },
      ],
      posts: [
        { time: '6h', text: "Hiring 2 senior engineers. Here's what we offer:\n\n- $190K base + reasonable equity\n- 40-hour weeks (we mean it)\n- 4 weeks PTO that we WILL email you to take\n- Health, dental, vision, mental health\n- Boring tech stack on purpose\n- A team that actually likes each other\n\nNo 'culture decks.' No 'ninja rockstars.' No 5am Slack. Just good work.\n\nDM me a portfolio.",
          likes: 14201, reposts: 3402 },
      ],
      comments: [
        { author: 'Burned Engineer', text: 'Priya is the rare manager I would actually trust', neg: false },
        { author: 'Industry Veteran', text: 'This is what tech should look like.', neg: false },
      ],
      requirements: { looks: 1, charisma: 3, smarts: 4, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi! Saw the match.","Quick question — can you describe a time you worked with someone who had a different skill set than yours?"],
            options: [
              { text: "Yes — pairing with a designer taught me a lot about UX.", next: 'good' },
              { text: "I usually just work alone.", next: 'concern' },
              { text: "What's the role pay?", next: 'fair' },
            ]
          },
          fair: {
            npc: ["Totally fair to ask.","Senior engineer: $190K base, $30K equity, 4 weeks PTO. Bonus is target 10%.","Want to keep talking?"],
            options: [
              { text: "Yes — what's the team like?", next: 'good' },
              { text: "Yes — what's the on-call?", next: 'good' },
            ]
          },
          concern: {
            npc: ["Got it.","No judgment, but our team relies on collaboration. Is that something you'd want to grow into?"],
            options: [
              { text: "Yes, I want to learn.", next: 'good' },
              { text: "Honestly, I prefer working alone.", next: 'fit' },
            ]
          },
          fit: {
            npc: ["Totally fair. We're probably not the right fit, but I appreciate the honesty.","If you ever want to chat about deep solo IC work, I know a few teams. Best of luck!"],
            end: 'ghosted'
          },
          good: {
            npc: ["Great answer.","Want to do a 45-min screen this week? Code walkthrough, not algos."],
            options: [
              { text: "Yes!", next: 'offer' },
              { text: "Yes, what's the format?", next: 'offer' },
            ]
          },
          offer: {
            npc: ["Great. We do a take-home, then a real conversation.","If both go well, you'll have an offer in 2 weeks.","Welcome aboard."],
            end: 'success'
          },
        }
      }
    },

    // ── 31. MAEVE SINCLAIR-RHODES — Theater kid running a 'creative agency' ─
    {
      id: 31, name: 'Maeve Sinclair-Rhodes', tagline: 'Creative Director • Storyteller • Vibesetter', emoji: '🎭',
      bio: "I 'curate experiences.' What does that mean? It means I throw $40K parties for brands and write 800-word LinkedIn posts about them. Performing arts degree. Currently 'between projects' (have been since 2019).",
      prompt: { q: "I'll know we're soulmates when", a: "you can use the word 'liminal' three times in one sentence and mean it" },
      funFacts: [
        "I have a one-woman show I've workshopped for 11 years",
        "I describe spreadsheets as 'a kind of poetry'",
        "I have made other adults cry by reading them my latest poem",
      ],
      interests: ['Liminal Spaces','Improv','Theatrical Brand Activations','Etsy','Collage'],
      experience: [
        { role: 'Creative Director', company: 'Sinclair-Rhodes Studio (just me)',  icon: '🎭' },
        { role: 'Brand Storyteller', company: 'Various consumer brands',            icon: '✨' },
        { role: 'Actor',             company: 'Touring children\'s theater',        icon: '🎪' },
      ],
      posts: [
        { time: '2d', text: "We don't sell soap. We sell HOPE WRAPPED IN LATHER.\n\nWe don't run brand campaigns. We curate cinematic emotional architectures.\n\nWe don't have meetings. We have INVOCATIONS.\n\n(My fee starts at $25K per quarter, please DM. Negotiable.)",
          likes: 1402, reposts: 89 },
      ],
      comments: [
        { author: 'Fellow Creative', text: 'Stunning. So evocative.', neg: false },
        { author: 'Honest Brand',    text: 'We paid her $40K and got nothing.', neg: true },
      ],
      requirements: { looks: 4, charisma: 4, smarts: 1, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello! ✨","I'd love to know — what is the texture of your inner world?"],
            options: [
              { text: "I'm sorry — what?", next: 'sneer' },
              { text: "Velvet. Chaotic. Drenched in moonlight.", next: 'kindred' },
              { text: "Can we just talk about jobs.", next: 'sneer' },
            ]
          },
          sneer: {
            npc: ["I'm not sure you have the artistic sensitivity for what we do.","Best of luck on your hustle ✨"],
            end: 'ghosted'
          },
          kindred: {
            npc: ["YES. 🎭","Where have you BEEN, kindred soul.","I have a contract role — 'Junior Soul Architect' — for my agency.","$22K, half paid in 'reflections.'"],
            options: [
              { text: "What's a 'reflection'?", next: 'lol' },
              { text: "I'll take it!", next: 'offer' },
              { text: "I need to be paid in money.", next: 'sneer' },
            ]
          },
          lol: {
            npc: ["A reflection is a thoughtful note I send you weekly about your performance ✨","It is technically not money.","But it has VALUE."],
            options: [
              { text: "Sure, fine, I'll take it.", next: 'offer' },
              { text: "I'd rather have actual money.", next: 'sneer' },
            ]
          },
          offer: {
            npc: ["The cosmos has aligned 🌙","Welcome. Our first 'invocation' is at 6am Saturday in a meadow.","Bring an open heart and a bag of dried lavender."],
            end: 'success'
          },
        }
      }
    },

    // ── 32. PASTOR JEFF — Megachurch CEO selling Jesus and SUVs. ────────
    {
      id: 32, name: 'Pastor Jeff Worthington', tagline: 'Lead Pastor • Best-Selling Author • Influencer', emoji: '⛪',
      bio: "Lead Pastor of Faith Mountain Megachurch. Author of 'Jesus Wants You To Be Rich.' I have a private jet that I describe as 'a tool for ministry.'",
      prompt: { q: "I want someone who", a: "won't ask why my church owns 4 SUVs and a private jet (it's for ministry)" },
      funFacts: [
        "I tithe 1% (the congregation tithes 10%)",
        "I have 11 books, all titled 'Bless Up [Number]'",
        "My wife wears more jewelry than the Queen of England",
      ],
      interests: ['Prosperity Gospel','Brand Building','SUVs','Tax Exemption','Selling Books'],
      experience: [
        { role: 'Lead Pastor',     company: 'Faith Mountain Church',  icon: '⛪' },
        { role: 'Author',          company: '11 best-sellers',         icon: '📚' },
        { role: 'Prosperity Coach', company: '$5K/seat conferences',    icon: '💰' },
      ],
      posts: [
        { time: '1d', text: "The Lord told me you should buy my new book 'Bless Up Volume 12.'\n\nIt's $39.99 (or $250 signed). It will change your life.\n\nThe Lord also told me he wants me to upgrade my jet. Tithe accordingly. 🙏",
          likes: 12402, reposts: 2103 },
      ],
      comments: [
        { author: 'Devoted Member', text: 'God bless you Pastor Jeff! Sending my paycheck!', neg: false },
        { author: 'Investigative Reporter', text: 'Pastor Jeff please answer the questions about the missing $4M', neg: true },
      ],
      requirements: { looks: 3, charisma: 5, smarts: 1, networking: 3, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Bless you my friend 🙏","Tell me — do you believe in PROSPERITY?"],
            options: [
              { text: "Yes Pastor!", next: 'maybe' },
              { text: "I just want a job.", next: 'pivot' },
              { text: "Prosperity gospel is a scam.", next: 'instabad' },
            ]
          },
          instabad: {
            npc: ["The Lord is testing me with you 🙏","I will pray for your soul (and not respond again)"],
            end: 'failed'
          },
          pivot: {
            npc: ["A 'job'? My friend, the Lord has a HIGHER calling for you 🙏","I'm hiring a 'Director of Outreach.' Salary is 'a calling.' (No salary.)"],
            options: [
              { text: "What's a 'calling' in dollars?", next: 'instabad' },
              { text: "Tell me more.", next: 'maybe' },
            ]
          },
          maybe: {
            npc: ["I have a $1,997 'Wealth & Faith' weekend coming up","If you attend AND tithe AND buy my book","I'll consider you for a paid role"],
            options: [
              { text: "I'll attend!", next: 'scammed' },
              { text: "I want a paid role first.", next: 'pivot' },
            ]
          },
          scammed: {
            npc: ["BLESSED 🙏","Sending the wire instructions","God will reward you (and pad my SUV fund)"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 33. PHOEBE MILLBROOK — Anxious overachiever in spiral. ──────────
    {
      id: 33, name: 'Phoebe Millbrook', tagline: 'Senior Associate • Type A • Currently Crying', emoji: '😰',
      bio: "Top of my class at Yale, top of my class at Yale Law, top of my class at making myself miserable. I work 90 hours, hate every minute, and refuse to leave because what would my parents think.",
      prompt: { q: "If I could change one thing", a: "I'd take a single weekend off without sobbing about my bonus" },
      funFacts: [
        "I have 4 different therapists. They don't know about each other.",
        "I have not had a free weekend since 2019",
        "I literally don't know how to relax",
      ],
      interests: ['Excel','Adderall','Ivy League Misery','Pretending To Be Fine','Spiraling'],
      experience: [
        { role: 'Senior Associate', company: 'Top BigLaw Firm',  icon: '⚖️' },
        { role: 'Associate',        company: 'Top BigLaw Firm',  icon: '⚖️' },
        { role: 'Summer Associate', company: 'Top BigLaw Firm',  icon: '⚖️' },
        { role: 'Yale, Yale, Yale', company: 'Yale',             icon: '🎓' },
      ],
      posts: [
        { time: '11pm', text: "Just billed 16 hours today. I have a wedding to attend tomorrow. I will likely miss it. The bride is my sister.\n\nThis is what success looks like. (right? right?? hello??)",
          likes: 8902, reposts: 1402 },
      ],
      comments: [
        { author: 'Fellow Lawyer', text: 'Same girl. Get the bonus.', neg: false },
        { author: 'Her Therapist', text: 'PHOEBE WE TALKED ABOUT THIS', neg: true },
      ],
      requirements: { looks: 3, charisma: 2, smarts: 5, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["sorry hi","i only have 4 minutes between calls","what do you want"],
            options: [
              { text: "I'm looking for a role at your firm.", next: 'pitch' },
              { text: "Phoebe… are you okay?", next: 'crack' },
              { text: "Can you just tell me what you do?", next: 'pitch' },
            ]
          },
          crack: {
            npc: ["i","i don't know","sorry","i haven't slept since tuesday","i'm fine","i'm fine","I'M FINE"],
            options: [
              { text: "Maybe take some time off?", next: 'breakdown' },
              { text: "I'm just here about jobs, sorry.", next: 'pitch' },
              { text: "It's okay, breathe. I'm here.", next: 'breakdown' },
            ]
          },
          breakdown: {
            npc: ["i can't take time off","my partner will know i'm weak","they'll cut my bonus","my parents will be DISAPPOINTED","do you know how many hours i bill","do you","you don't get it","you DON'T GET IT"],
            options: [
              { text: "Phoebe, you need help. Not a job from me.", next: 'wakeup' },
              { text: "Sorry, can we still talk about jobs?", next: 'shutdown' },
            ]
          },
          shutdown: {
            npc: ["yeah sure","email me your resume","brb","(she never reads it.)"],
            end: 'ghosted'
          },
          wakeup: {
            npc: ["i…","you're right","i need to go","thank you","(she doesn't reply for 6 months. then she does. she quit. she's happier. you're 'the reason.')"],
            end: 'success'
          },
          pitch: {
            npc: ["okay.","junior associate position. $215K base. 80 billable hour minimum.","you'll be miserable. you'll make money. that's the deal.","in?"],
            options: [
              { text: "I'm in.", next: 'misery' },
              { text: "80 hours? Hard pass.", next: 'shutdown' },
            ]
          },
          misery: {
            npc: ["good.","welcome to the firm.","(a single tear rolls down her face.)","welcome."],
            end: 'success'
          },
        }
      }
    },

    // ── 34. BUCKLEY HEMSWORTH — Polo bro / hedge fund LARPer. ───────────
    {
      id: 34, name: 'Buckley Hemsworth', tagline: 'Hedge Fund Analyst • Polo Player • Patrick Bateman 2.0', emoji: '🐎',
      bio: "Lehman Brothers DNA, Andover, Princeton, Goldman, hedge fund. Yes those are different things. I will tell you about each one. I have three watches and zero personality.",
      prompt: { q: "An ideal date is", a: "you, me, my Patek, and a $1,500 omakase where I make you talk about my Andover days" },
      funFacts: [
        "I list 'Princeton' before any actual job on my LinkedIn",
        "I bought a Rolex, cried about it 'still being just a Submariner'",
        "I have flexed my Andover ring at strangers in airports",
      ],
      interests: ['Polo','Watches','Andover','Princeton','Goldman'],
      experience: [
        { role: 'Hedge Fund Analyst', company: 'A fund you haven\'t heard of', icon: '💸' },
        { role: 'IB Analyst',         company: 'Goldman Sachs',                 icon: '🏛️' },
        { role: 'Princeton',          company: 'Princeton (this is a job apparently)', icon: '🐯' },
      ],
      posts: [
        { time: '4d', text: "Reflecting on my Andover years today. The friendships, the rigor, the casual cruelty.\n\nIt taught me everything I needed to know about leadership: how to humiliate weaker peers in public.\n\nGrateful 🐎",
          likes: 124, reposts: 8 },
      ],
      comments: [
        { author: 'Other Andover Bro', text: 'Hear hear Buckley! Reunion in Aspen?', neg: false },
        { author: 'Real Person', text: 'No one cares where you went to high school.', neg: true },
      ],
      requirements: { looks: 3, charisma: 2, smarts: 2, networking: 3, nepotism: 4 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["What boarding school did you attend."],
            options: [
              { text: "Andover.", next: 'happy' },
              { text: "Public school.", next: 'horror' },
              { text: "Why does that matter?", next: 'horror' },
            ]
          },
          horror: {
            npc: ["Public school.","I think we want different things.","Do try to keep up. Cheers."],
            end: 'ghosted'
          },
          happy: {
            npc: ["Class?"],
            options: [
              { text: "'09.", next: 'connection' },
              { text: "I'd rather not say.", next: 'horror' },
            ]
          },
          connection: {
            npc: ["Excellent. I was '07. We knew the same crowd.","I'll have my analyst send you the JD.","Comp is 'discretionary.' We start tomorrow."],
            options: [
              { text: "Sounds great.", next: 'offer' },
              { text: "What's discretionary mean.", next: 'horror' },
            ]
          },
          offer: {
            npc: ["Settled.","Welcome to the fund. Don't disappoint."],
            end: 'success'
          },
        }
      }
    },

    // ── 35. SARAH DOWNFIELD — Forever-grad who is on dissertation #4. ───
    {
      id: 35, name: 'Sarah Downfield', tagline: 'PhD Candidate, year 9 of 5', emoji: '📚',
      bio: "Year 9 of my 5-year PhD program in Comparative Media Theory. I have not finished my dissertation. I will not finish my dissertation. I have $200K in student debt and a fellowship that pays $24K.",
      prompt: { q: "I'm convinced", a: "I'll defend 'next semester.' I have been saying this since 2018." },
      funFacts: [
        "I have 11 unfinished dissertation drafts",
        "I have written 4 articles, none published",
        "My advisor has not responded to me in 3 months",
      ],
      interests: ['Dissertation Avoidance','Free Conference Wine','Imposter Syndrome','Adjuncting'],
      experience: [
        { role: 'PhD Candidate (year 9)', company: 'Some University',     icon: '📚' },
        { role: 'Adjunct',                company: '4 different schools',  icon: '😩' },
        { role: 'TA',                     company: 'Various',              icon: '👩‍🏫' },
      ],
      posts: [
        { time: '8h', text: "Day 3,247 of telling people 'I'm almost done.'\n\nI am not almost done. I will never be almost done. The dissertation has a life of its own. It hates me. I hate it. We are in a violent codependency.",
          likes: 4204, reposts: 502 },
      ],
      comments: [
        { author: 'Fellow Grad', text: 'Year 11 here. Solidarity.', neg: false },
        { author: 'Her Advisor', text: 'Sarah we have not met in a year.', neg: true },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 4, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["hi","what year are you in your phd","or are you a normal person"],
            options: [
              { text: "Normal person, looking for work.", next: 'jealous' },
              { text: "I'm a recovering grad student.", next: 'kindred' },
              { text: "I have a PhD already.", next: 'mad' },
            ]
          },
          mad: {
            npc: ["how DARE you","leave","just LEAVE"],
            end: 'failed'
          },
          jealous: {
            npc: ["…you finished things on time","i'm sorry that's amazing","don't follow me into academia please","run while you can"],
            options: [
              { text: "Are you hiring?", next: 'pitch' },
              { text: "Want to chat anyway?", next: 'spiral' },
            ]
          },
          kindred: {
            npc: ["solidarity 🥲","what year are you out","never finished?","good. me too. probably forever."],
            options: [
              { text: "I'm looking for non-academic work.", next: 'pitch' },
              { text: "Want to commiserate?", next: 'spiral' },
            ]
          },
          spiral: {
            npc: ["i haven't seen sunlight in 11 days","my advisor doesn't email back","i'm so tired","i should just leave the program","but i CAN'T","my parents will be","disappointed","sorry","sorry"],
            end: 'ghosted'
          },
          pitch: {
            npc: ["i'm working on a research project","if you want unpaid 'research assistance' i'd take you","but you'd be helping me read 4000 pages by friday","sorry that sounds bad","that's because it is"],
            options: [
              { text: "I'll help. For free.", next: 'good' },
              { text: "Pass.", next: 'spiral' },
            ]
          },
          good: {
            npc: ["really?","wait","you're serious?","oh my god","okay","i'll send the chapter draft","this is the most help i've gotten in 2 years","welcome aboard. i think.","(she sends you the draft. it's 400 pages. you're now in this with her.)"],
            end: 'success'
          },
        }
      }
    },

    // ── 36. DOUG LIGHTHOUSE — Boomer LinkedIn poster king. ──────────────
    {
      id: 36, name: 'Doug Lighthouse', tagline: 'Father • Husband • Sales Professional • Servant Leader', emoji: '🦌',
      bio: "I post 5 times a day on LinkedIn. Each post starts with a 1-sentence story about my dad. They all end with 'thoughts?'. I have not had a new thought since 2002.",
      prompt: { q: "Two truths and a lie", a: "1. I shake every employee's hand. 2. I post 5 inspirational stories daily. 3. I have ever read a book." },
      funFacts: [
        "I tag 30 people in every post",
        "I refer to my emails as 'memos'",
        "I think 'agile' means 'I can golf any day of the week'",
      ],
      interests: ['Sales','Golf','LinkedIn','Anecdotes About My Dad','Generic Inspiration'],
      experience: [
        { role: 'VP of Sales', company: 'Industrial Lubricants Inc', icon: '🦌' },
      ],
      posts: [
        { time: '7am', text: "When I was 12, my father took me to the hardware store. He said, 'Doug, character is what you do when no one is looking.'\n\n40 years later, I built a sales team of 200 people.\n\nThoughts?\n\n#leadership #sales #integrity #legacy #linkedin",
          likes: 8412, reposts: 1402 },
      ],
      comments: [
        { author: 'Fellow Boomer',    text: 'BEAUTIFUL Doug. Sharing this with my whole team.', neg: false },
        { author: 'Tagged Connection', text: 'Doug please stop tagging me in things', neg: true },
      ],
      requirements: { looks: 2, charisma: 3, smarts: 1, networking: 4, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["When I was 12, my father took me to a baseball game.","He said, 'Doug, success in life is 90% showing up.'","Have you considered showing up at my company?"],
            options: [
              { text: "Yes! Tell me more.", next: 'pitch' },
              { text: "What does your company do?", next: 'pitch' },
              { text: "What does this story have to do with anything?", next: 'mad' },
            ]
          },
          mad: {
            npc: ["When I was 14, my father told me 'Doug, never disrespect a story.'","I think we want different things. Best of luck.","#values #integrity"],
            end: 'failed'
          },
          pitch: {
            npc: ["I sell industrial lubricants.","Account Executive. $55K base, 'unlimited' commission, 50% travel, in-person 5 days.","When I was 16 my father said 'Doug, sales builds character.' He was right."],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "Lubricants? Pass.", next: 'mad' },
            ]
          },
          offer: {
            npc: ["When I was 19 my father told me 'always shake a man's hand firmly.'","I'll see you Monday at 7am sharp.","Don't be late. Lateness is a character flaw."],
            end: 'success'
          },
        }
      }
    },

    // ── 37. CAMILA REYES — Real underdog. Self-taught dev. ──────────────
    {
      id: 37, name: 'Camila Reyes', tagline: 'Self-Taught Developer • First-Gen • Built My Way Up', emoji: '✊',
      bio: "Self-taught developer, first-generation college grad, took 6 years to get my CS degree while working two jobs. Now a senior engineer. I am the only person here who isn't faking.",
      prompt: { q: "I'm convinced", a: "the best engineers are the ones who had to fight to learn, not the ones whose parents bought them a Codecademy subscription" },
      funFacts: [
        "I learned to code on a chromebook from the library",
        "I worked night shifts at Walgreens to pay for my CS degree",
        "I mentor 12 underrepresented engineers in their first roles",
      ],
      interests: ['Mentorship','Open Source','Real Engineering','Underrepresented in Tech','Community'],
      experience: [
        { role: 'Senior Engineer', company: 'Mid-size company', icon: '✊' },
        { role: 'Engineer',        company: 'Startup that paid attention', icon: '💻' },
        { role: 'Bootcamp Grad',   company: 'Self-taught + scholarship', icon: '🎓' },
      ],
      posts: [
        { time: '1d', text: "Hot take: 'culture fit' is often code for 'familiar background.'\n\nI hire on demonstrated work and growth — not where you went to school.\n\nIf you've shipped something — anything — I want to talk to you. Even if your background isn't 'traditional.' Especially if it isn't.\n\nDM me.",
          likes: 24501, reposts: 5402 },
      ],
      comments: [
        { author: 'Mentee',           text: 'Camila changed my life', neg: false },
        { author: 'Industry Veteran', text: 'This is the kind of leader we need.', neg: false },
        { author: 'Bro Engineer',     text: 'Diversity hire complains about diversity', neg: true },
      ],
      requirements: { looks: 1, charisma: 3, smarts: 4, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey! Saw the match.","Tell me — what's the hardest thing you've had to figure out from scratch?"],
            options: [
              { text: "Honestly, learning to code while working full-time.", next: 'kindred' },
              { text: "I went to bootcamp. It was structured.", next: 'real' },
              { text: "I learned a lot at Stanford.", next: 'maybe' },
            ]
          },
          kindred: {
            npc: ["I was you 8 years ago.","Walk me through what you've shipped — even if it feels small."],
            options: [
              { text: "I built a tool that 30 people use daily.", next: 'offer' },
              { text: "Just school projects so far.", next: 'mentor' },
            ]
          },
          real: {
            npc: ["Cool. What did you build there?","Walk me through your favorite project."],
            options: [
              { text: "I built a full-stack app with users.", next: 'offer' },
              { text: "We did mostly tutorials.", next: 'mentor' },
            ]
          },
          maybe: {
            npc: ["Stanford's great. What did you actually build there?"],
            options: [
              { text: "Independent research project I'm proud of.", next: 'offer' },
              { text: "Nothing real, mostly classes.", next: 'mentor' },
            ]
          },
          mentor: {
            npc: ["No shame. Most people start there.","I run a free mentorship program. I'd love you in the cohort.","Once you ship one real thing, message me again. I'll get you a job."],
            end: 'success'
          },
          offer: {
            npc: ["You're real. I can tell.","Senior IC role. $185K base, real equity, 4 weeks PTO.","Welcome aboard."],
            end: 'success'
          },
        }
      }
    },

    // ── 38. WALLACE FENWICK — Yacht broker desperately networking. ──────
    {
      id: 38, name: 'Wallace Fenwick', tagline: 'Yacht Broker • Champagne Lifestyle Connoisseur', emoji: '🛥️',
      bio: "I sell yachts I'll never own. I am at every Miami boat show, Monaco grand prix, and Hamptons summer party. I have $4.50 in checking. My business cards cost more than my rent.",
      prompt: { q: "I'm a sucker for", a: "anyone whose father has a 'family office' (please marry me)" },
      funFacts: [
        "I wear a Rolex (rented)",
        "I drive a Mercedes (leased to the limit)",
        "I haven't paid rent on time in 7 months",
      ],
      interests: ['Yachts','Champagne','Networking','Fake-It-Til-You-Make-It','Polo Shirts'],
      experience: [
        { role: 'Yacht Broker',       company: 'Fenwick Maritime',  icon: '🛥️' },
        { role: 'Lifestyle Curator',  company: 'Self-employed',      icon: '✨' },
      ],
      posts: [
        { time: '6h', text: "Just closed a $4M yacht deal! 🛥️🍾\n\n(My commission was 3%. After taxes that's $80K. I owe my landlord $14K. Math is still mathing.)",
          likes: 412, reposts: 28 },
      ],
      comments: [
        { author: 'Yacht Broker Bro', text: 'CONGRATS Wally!', neg: false },
        { author: 'His Landlord',     text: 'Wallace pay your rent', neg: true },
      ],
      requirements: { looks: 4, charisma: 4, smarts: 1, networking: 4, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey hey hey 🛥️","Quick question — does your family own a yacht? Or, you know, anything floating?"],
            options: [
              { text: "No, but I want to learn the industry.", next: 'fade' },
              { text: "Yes, my family has connections.", next: 'pounce' },
              { text: "Why do you ask?", next: 'fade' },
            ]
          },
          fade: {
            npc: ["Ah okay","Cool, cool","Let me get back to you on that","(He won't.)"],
            end: 'ghosted'
          },
          pounce: {
            npc: ["MY FRIEND 🛥️","You and I are going to be GREAT together","I'm hiring a 'Junior Networking Associate.'","Salary: $0 base. Commission: 0.5%. Yacht parties: included."],
            options: [
              { text: "$0 base?", next: 'fade' },
              { text: "I'll take it.", next: 'success' },
            ]
          },
          success: {
            npc: ["LFG 🥂","First gig: introduce me to your family at the Hamptons next weekend","Wear something fitted"],
            end: 'success'
          },
        }
      }
    },

    // ── 39. ASHLEY POSTMAN — DEI consultant who is doing Real Work. ─────
    {
      id: 39, name: 'Ashley Postman', tagline: 'DEI Strategist • Author • Workshop Facilitator', emoji: '🪧',
      bio: "I help companies do the inner work. I charge $50K per workshop. I will use the word 'liberation' 47 times. Some of my clients are Fortune 500. Some of my clients ghost me after the first invoice.",
      prompt: { q: "I'm convinced", a: "your discomfort during my workshop is exactly the point (and is totally not unprofessional behavior)" },
      funFacts: [
        "I have made HR teams cry on three continents",
        "I once made a CEO apologize to his entire board for 'his energy'",
        "My consulting fee is 'whatever the company can stomach'",
      ],
      interests: ['Liberation','Inner Work','Workshop Facilitation','Decolonization','Calling People In'],
      experience: [
        { role: 'Founder & CEO', company: 'Postman Strategies LLC', icon: '🪧' },
        { role: 'Author',        company: 'Two best-selling books',  icon: '📚' },
        { role: 'Speaker',       company: 'TED, SXSW, Davos',        icon: '🎤' },
      ],
      posts: [
        { time: '2d', text: "If your workplace doesn't have a 'liberation framework,' it has a problem.\n\nI ran a 4-hour workshop yesterday for a fortune 500 CEO. He cried (I made it happen). He pledged $4M to 'inner work programming.' He now has my coaching for 18 months at $400K.\n\nThe revolution is profitable. ✊",
          likes: 14502, reposts: 2403 },
      ],
      comments: [
        { author: 'Believer',         text: 'Ashley is doing THE WORK 🙏', neg: false },
        { author: 'Anonymous Worker', text: 'My office paid Ashley $50K for nothing to change', neg: true },
      ],
      requirements: { looks: 3, charisma: 4, smarts: 3, networking: 3, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi! ✊","Before we go further — are you committed to your inner work?"],
            options: [
              { text: "Yes, deeply.", next: 'pitch' },
              { text: "What does that mean specifically?", next: 'sneer' },
              { text: "I just want a job.", next: 'sneer' },
            ]
          },
          sneer: {
            npc: ["I appreciate your honesty.","But you're not ready for this work yet.","Come back when you've decentered yourself."],
            end: 'ghosted'
          },
          pitch: {
            npc: ["I'd love to bring you onto my team — as a 'Liberation Apprentice.'","12 months unpaid, working alongside me.","Then maybe a $40K role.","Worth it for the experience and exposure."],
            options: [
              { text: "12 months unpaid?", next: 'sneer' },
              { text: "I'll take it.", next: 'scammed' },
            ]
          },
          scammed: {
            npc: ["LIBERATION ✊","Sending the contract.","The contract notes you cannot speak about your role for 5 years.","Welcome to the work."],
            end: 'scammed'
          },
        }
      }
    },

    // ── 40. CHARLIE GRINDLE — Gig worker who is mostly just exhausted. ──
    {
      id: 40, name: 'Charlie Grindle', tagline: 'Uber/Lyft/DoorDash/Instacart • Grindset', emoji: '🚗',
      bio: "I drive for Uber, Lyft, DoorDash, Instacart, and Amazon Flex simultaneously. I sleep 4 hours a night. I have not seen daylight in 3 weeks. The grindset is real (and unsustainable).",
      prompt: { q: "I want a teammate who", a: "understands that 'gig economy' is just 'no benefits' in a polo shirt" },
      funFacts: [
        "I have driven for 6 different apps in one day",
        "I keep pee bottles in my car (it's a job)",
        "I have not had a day off in 11 months",
      ],
      interests: ['Driving','Defensive Tipping','Algorithm Anxiety','Exhaustion'],
      experience: [
        { role: 'Driver',  company: 'Uber',         icon: '🚗' },
        { role: 'Driver',  company: 'Lyft',         icon: '🚗' },
        { role: 'Courier', company: 'DoorDash',     icon: '🛵' },
        { role: 'Shopper', company: 'Instacart',    icon: '🛒' },
        { role: 'Driver',  company: 'Amazon Flex',  icon: '📦' },
      ],
      posts: [
        { time: '3am', text: "Drove 14 hours today. Made $87 after gas.\n\nSomeone tipped me $0.50 on a 12-mile delivery. The CEO of Uber made $24M last year.\n\nSeems sustainable.",
          likes: 41204, reposts: 8902 },
      ],
      comments: [
        { author: 'Fellow Driver', text: 'I feel this in my SOUL', neg: false },
        { author: 'Real Person',   text: 'This is genuinely heartbreaking', neg: false },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 2, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["yo","sorry, on a delivery","what's up"],
            options: [
              { text: "Just wanted to say hi. Take care.", next: 'kind' },
              { text: "Are you hiring?", next: 'irony' },
              { text: "Rough job. Stay safe.", next: 'kind' },
            ]
          },
          irony: {
            npc: ["…hiring?","brother i AM the gig","i'm not hiring","i'm dying"],
            options: [
              { text: "Sorry. Rough out there.", next: 'kind' },
              { text: "Want me to introduce you to a salaried role?", next: 'real' },
            ]
          },
          kind: {
            npc: ["thanks","just keep being kind to drivers","that's the job","🚗"],
            end: 'ghosted'
          },
          real: {
            npc: ["wait","you're serious?","i — yes","yes please","i haven't slept in 11 months","i would kill for a salary","please"],
            options: [
              { text: "I'll connect you with someone hiring.", next: 'success' },
              { text: "Actually I was joking. Sorry.", next: 'cruel' },
            ]
          },
          cruel: {
            npc: ["…","oh","okay","yeah","makes sense","gotta go, ride request","🚗"],
            end: 'failed'
          },
          success: {
            npc: ["thank you","actually thank you","i'll wait for the intro","my back is broken but my heart is full","🥹"],
            end: 'success'
          },
        }
      }
    },

    // ── 41. MILES PROCK — 14-year-old "founder" with a TED Talk. ────────
    {
      id: 41, name: 'Miles Prock', tagline: 'CEO @ 14 • TEDx Speaker • Forbes 30 Under 13', emoji: '🧒',
      bio: "I'm 14 years old. I've raised $4M in 'pre-seed.' My parents are LPs in my fund. I have a TEDx talk titled 'Why Childhood Is Overrated.' I will fire you for using emoji.",
      prompt: { q: "I want a teammate who", a: "respects that I missed my own birthday party for an investor call (I'm 14)" },
      funFacts: [
        "My parents are 100% of my customers",
        "I gave a TED talk on 'leadership' (I have led no one)",
        "I have a Substack about 'building empires' written entirely by ChatGPT",
      ],
      interests: ['Empire Building','Stoicism','Naval Ravikant Quotes','Skipping School','Lying On TV'],
      experience: [
        { role: 'CEO',          company: 'Prock Industries',      icon: '🧒' },
        { role: 'Founder',      company: 'Three failed apps',      icon: '📱' },
        { role: '8th Grader',   company: 'Middle school (skipping)', icon: '🎒' },
      ],
      posts: [
        { time: '1d', text: "At 14, I've already learned what most adults don't:\n\n- Sleep is a tool\n- Friendships are 'optionality'\n- School is for losers (I have a tutor)\n- 'Vacation' is a millennial cope\n\nGrinding while you watch cartoons. 🧒",
          likes: 8401, reposts: 1402 },
      ],
      comments: [
        { author: 'Forbes Editor', text: 'This kid is the future! Featuring him next month.', neg: false },
        { author: 'Concerned Adult', text: 'Where are this child\'s parents', neg: true },
      ],
      requirements: { looks: 1, charisma: 3, smarts: 3, networking: 2, nepotism: 5 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["I am between meetings.","I have 90 seconds.","Pitch yourself."],
            options: [
              { text: "Senior IC, 10+ years experience, ready to lead a team.", next: 'snub' },
              { text: "Sir/Ma'am, you are a literal child.", next: 'fired' },
              { text: "I'd love to learn from your journey.", next: 'flattered' },
            ]
          },
          fired: {
            npc: ["Age is a construct.","Maturity is a meme.","BLOCKED."],
            end: 'failed'
          },
          snub: {
            npc: ["10 years of experience.","I have 14 years of LIFE experience.","Sit down."],
            end: 'failed'
          },
          flattered: {
            npc: ["Excellent answer.","Most adults are intimidated by my drive.","I'm hiring a Chief of Staff. Salary: $0. Equity: 'TBD.'","Are you in?"],
            options: [
              { text: "Yes!", next: 'offer' },
              { text: "$0 salary?", next: 'snub' },
            ]
          },
          offer: {
            npc: ["My mother will email you the contract.","She handles 'admin.'","Welcome to Prock Industries 🧒"],
            end: 'success'
          },
        }
      }
    },

    // ── 42. JANELLE WARDLOW — Anti-vax wellness mom. ────────────────────
    {
      id: 42, name: 'Janelle Wardlow', tagline: 'Crunchy Mom • Holistic Wellness • Truth Seeker', emoji: '🌾',
      bio: "Mom of 5 unvaccinated free-range children. I cure illness with sunlight and 'positive thinking.' I do not trust doctors, scientists, or anyone who 'studied' anything. Currently selling raw goat milk to my Facebook moms group.",
      prompt: { q: "I'm convinced", a: "Big Pharma is hiding the cure (the cure is sunlight and a $89 supplement I sell)" },
      funFacts: [
        "I have a 9,000-word Facebook post about 'doing my research'",
        "I have 'cured' my kids' fevers with apple cider vinegar (the fevers were viral)",
        "I sell $200 'detox protocols' that are just lemon water",
      ],
      interests: ['Sunlight','Raw Milk','Conspiracy Theories','Essential Oils','Distrust Of Doctors'],
      experience: [
        { role: 'Holistic Wellness Coach', company: 'Self-employed',     icon: '🌾' },
        { role: 'Founder',                 company: 'Mama Wardlow Wellness', icon: '🍋' },
      ],
      posts: [
        { time: '5h', text: "MOMS — listen up.\n\nDid you know the SUN cures 90% of childhood illnesses? (I read this in a Facebook group.) I haven't taken my kids to a pediatrician in 9 years and they're THRIVING. (One has measles right now, but THRIVING.)\n\nDM me for my $79 'Sunshine Protocol.' 🌾",
          likes: 8401, reposts: 1402 },
      ],
      comments: [
        { author: 'Granola Mom Group', text: 'YES Janelle! So based!', neg: false },
        { author: 'Nurse Anonymously', text: 'PLEASE TAKE YOUR KIDS TO THE DOCTOR', neg: true },
      ],
      requirements: { looks: 3, charisma: 3, smarts: 0, networking: 3, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey mama 🌾","Quick question — are you on the SAD diet?"],
            options: [
              { text: "What's the SAD diet?", next: 'pitch' },
              { text: "Standard American Diet, yes.", next: 'horror' },
              { text: "I just want a job.", next: 'pivot' },
            ]
          },
          horror: {
            npc: ["I weep for you.","Until you heal your gut, you cannot heal your career.","🌾"],
            end: 'ghosted'
          },
          pivot: {
            npc: ["A 'job'?? Mama 🌾","Why would you trade your TIME for someone else's WEALTH?","I have an opportunity."],
            options: [
              { text: "Sure, tell me.", next: 'pitch' },
              { text: "Hard pass.", next: 'horror' },
            ]
          },
          pitch: {
            npc: ["I'm building a network of holistic wellness ambassadors 🌾","You'll sell my $79 'Sunshine Protocol' and $200 'Detox.'","Initial inventory: $499.","You'll make MILLIONS."],
            options: [
              { text: "I'll join!", next: 'scammed' },
              { text: "This is an MLM.", next: 'mad' },
            ]
          },
          mad: {
            npc: ["EXCUSE ME","I run a LEGITIMATE BUSINESS","BLOCKED. Praying you find healing 🌾"],
            end: 'failed'
          },
          scammed: {
            npc: ["WELCOME MAMA 🌾🌾🌾","Venmo me $499 by Friday","First task: recruit 3 friends from your church group"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 43. CASPAR FORTH — Bored billionaire with no real role. ─────────
    {
      id: 43, name: 'Caspar Forth', tagline: 'Investor • Philosopher • Heir', emoji: '🏰',
      bio: "I am a billionaire. I do not work. My family owns several countries. I am bored. I 'invest' in startups for entertainment. I will fund you, then forget your name within 6 hours.",
      prompt: { q: "Most spontaneous thing I've done", a: "bought a vineyard at lunch because the napkins were nice" },
      funFacts: [
        "I have 7 passports",
        "I have started a 'fund' that has invested $1.2B and made $0",
        "I have eaten at a restaurant called 'Chez Mark' (the chef IS named Mark)",
      ],
      interests: ['Vineyards','Existential Boredom','Castles','Yachts','Buying Entire Streets'],
      experience: [
        { role: 'Heir',           company: 'Forth Family Trust',  icon: '🏰' },
        { role: 'Casual Investor', company: 'Anything I find amusing', icon: '🎩' },
      ],
      posts: [
        { time: '3d', text: "Bored today. Bought a small island.\n\nIt is uninhabited. I will likely never visit it. The agent is taking 4%.\n\nThis is the third island this year. I should perhaps consult a therapist (I won't).",
          likes: 14502, reposts: 4503 },
      ],
      comments: [
        { author: 'Other Billionaire',  text: 'Mood. Just bought a third yacht.', neg: false },
        { author: 'Random Working Person', text: 'My rent is $3000. Eat the rich.', neg: true },
      ],
      requirements: { looks: 3, charisma: 2, smarts: 2, networking: 3, nepotism: 5 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello.","I'm bored.","Amuse me."],
            options: [
              { text: "I have a startup idea you'd love.", next: 'amuse' },
              { text: "Sir, I just want a job.", next: 'snore' },
              { text: "I refuse to amuse you.", next: 'amused' },
            ]
          },
          snore: {
            npc: ["A 'job.'","How quaint.","Goodbye."],
            end: 'ghosted'
          },
          amused: {
            npc: ["Ha.","Refusing to amuse me is in itself amusing.","You may have a position. Call my secretary."],
            end: 'success'
          },
          amuse: {
            npc: ["Pitch.","Make it brief. I will not retain it."],
            options: [
              { text: "Subscription service for forgetting things.", next: 'amused' },
              { text: "Standard SaaS for medium businesses.", next: 'snore' },
              { text: "Honestly I don't have an idea, just need money.", next: 'amused' },
            ]
          },
        }
      }
    },

    // ── 44. ARJUN PATEL — Cult-of-Apple software bro. ───────────────────
    {
      id: 44, name: 'Arjun Patel', tagline: 'Senior PM @ Apple • Aesthetic Maximalist', emoji: '🍎',
      bio: "PM at Apple. I have not used a non-Apple product since 2007. I refuse to acknowledge that Android exists. I will ghost you if you mention 'side-loading.' My personality is the Apple keynote.",
      prompt: { q: "Don't hate me if I", a: "spend 90 minutes correcting you for calling AirPods 'wireless earbuds'" },
      funFacts: [
        "I have 11 Apple products. I use 3.",
        "I have argued with strangers about USB-C",
        "I once cried watching a Tim Cook keynote",
      ],
      interests: ['Apple','Apple Design','Apple Marketing','Apple Genius Bar','Apple Cult'],
      experience: [
        { role: 'Senior PM', company: 'Apple', icon: '🍎' },
        { role: 'PM',        company: 'Apple', icon: '🍎' },
        { role: 'APM',       company: 'Apple', icon: '🍎' },
      ],
      posts: [
        { time: '6h', text: "The new Apple Vision Pro is, without exaggeration, the most important computing device since the printing press.\n\nIt costs $3,499. It cures loneliness (it doesn't). It is courageous. It is beautiful.\n\nIf you don't get it, you don't get vision. (No pun intended.)",
          likes: 24502, reposts: 5403 },
      ],
      comments: [
        { author: 'Apple Stan',     text: 'PRECISELY Arjun. Vision is the future.', neg: false },
        { author: 'Android User',   text: 'It is a $3,499 ski mask', neg: true },
      ],
      requirements: { looks: 3, charisma: 3, smarts: 3, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi.","Quick screening question — what phone do you use?"],
            options: [
              { text: "iPhone 15 Pro Max, of course.", next: 'pass' },
              { text: "Android.", next: 'horror' },
              { text: "Why does it matter?", next: 'horror' },
            ]
          },
          horror: {
            npc: ["I see.","I'm afraid we're not aligned.","Goodbye."],
            end: 'failed'
          },
          pass: {
            npc: ["Excellent.","Have you upgraded to the latest iOS?"],
            options: [
              { text: "Day one.", next: 'love' },
              { text: "Eventually.", next: 'horror' },
            ]
          },
          love: {
            npc: ["A kindred soul.","Senior PM role at Apple. $300K base + RSUs. 5 years of Steve Jobs hagiography expected.","Want it?"],
            options: [
              { text: "Yes!", next: 'offer' },
              { text: "What's the day-to-day actually like?", next: 'horror' },
            ]
          },
          offer: {
            npc: ["Welcome.","First task: memorize the keynote announcement.","Word for word.","🍎"],
            end: 'success'
          },
        }
      }
    },

    // ── 45. JUSTIN GLAZER — Washed-up child star pivoting to LinkedIn. ──
    {
      id: 45, name: 'Justin Glazer', tagline: 'Former Child Star • Now A "Founder"', emoji: '🌟',
      bio: "You may remember me from 'Adventures of Lil\\'Jus' (Disney Channel, 2003-2006). I'm now an entrepreneur. I have a podcast. I have 4 failed restaurants. I will mention being on TV in our first conversation.",
      prompt: { q: "I'll know it's right when", a: "you ask me about my Disney days within 3 minutes (you will)" },
      funFacts: [
        "I appear on E! 'Where Are They Now?' once a year",
        "I have an autobiography titled 'Famous At 8'",
        "I have 4 failed restaurants and 2 failed clothing lines",
      ],
      interests: ['Nostalgia','Old Photos Of Me','My Podcast','Fame','Vague Founder Energy'],
      experience: [
        { role: 'Founder',           company: 'JG Ventures (defunct)', icon: '🌟' },
        { role: 'Founder',           company: 'GlazedDonuts (defunct)', icon: '🍩' },
        { role: 'Podcast Host',      company: 'Glazer Talks (37 listeners)', icon: '🎙️' },
        { role: 'Child Actor',       company: 'Disney Channel',         icon: '📺' },
      ],
      posts: [
        { time: '2d', text: "20 years ago I was on a hit Disney show.\n\nNow I'm CEO of a fintech startup.\n\nThe energy I brought to playing 'Lil'Jus' is the same energy I bring to building my $4M in (prospective, theoretical) ARR.\n\nFame teaches you EVERYTHING. (It does not.) 🌟",
          likes: 14201, reposts: 2403 },
      ],
      comments: [
        { author: 'Nostalgic Millennial', text: 'OMG I LOVED YOU growing up!!', neg: false },
        { author: 'Honest Person',        text: 'You\'re 32 and have made nothing in 15 years', neg: true },
      ],
      requirements: { looks: 4, charisma: 3, smarts: 1, networking: 3, nepotism: 2 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey 🌟","Did you ever watch Adventures of Lil'Jus growing up?"],
            options: [
              { text: "Of course! You were great!", next: 'flattered' },
              { text: "I have not seen it, no.", next: 'sad' },
              { text: "Can we talk about jobs and not your show.", next: 'sad' },
            ]
          },
          sad: {
            npc: ["…","I see.","I think we want different things 🌟","(He is wounded.)"],
            end: 'ghosted'
          },
          flattered: {
            npc: ["YOU GET IT 🥹","I'm hiring a 'Founding Brand Storyteller' for my new fintech app","Salary: $35K. Equity: 'meaningful.'","You'll mostly listen to me talk about Disney."],
            options: [
              { text: "Sounds perfect.", next: 'offer' },
              { text: "$35K? In what currency?", next: 'sad' },
            ]
          },
          offer: {
            npc: ["LFG 🌟","First task: re-watch all 4 seasons of my show","I'll quiz you. Welcome aboard."],
            end: 'success'
          },
        }
      }
    },

    // ── 46. ELSIE BARNES — Federal employee 14 years from retirement. ───
    {
      id: 46, name: 'Elsie Barnes', tagline: 'Senior Specialist III, GS-13 • Department of Forms', emoji: '📑',
      bio: "31 years at the Department of Forms. 14 years until retirement. I will tell you about my pension THREE times in the first conversation. I have moved 6 inches in my career and that's how I want it.",
      prompt: { q: "I get along best with", a: "anyone who appreciates that I take my full lunch hour and have NEVER been productive past 4:00 PM" },
      funFacts: [
        "I have not learned a new system since 1998",
        "I print every email and put them in a binder",
        "My desk plant is 22 years old",
      ],
      interests: ['Pensions','Vacation Days','Refusing To Adopt New Software','Filing','Lunch'],
      experience: [
        { role: 'Senior Specialist III', company: 'Department of Forms (31 yrs)', icon: '📑' },
      ],
      posts: [
        { time: '3w', text: "Today is my 31st anniversary at the Department.\n\n14 more years until I qualify for the full pension.\n\nThat's 14 more years of not learning Slack, not opening Teams, and yelling at IT for 'breaking my Outlook.'\n\nGod bless America 🇺🇸",
          likes: 412, reposts: 18 },
      ],
      comments: [
        { author: 'Coworker A',    text: 'Elsie you have not opened your computer this week', neg: true },
        { author: 'Fellow Boomer', text: 'Hear hear Elsie!', neg: false },
      ],
      requirements: { looks: 1, charisma: 1, smarts: 2, networking: 1, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello.","Are you a contractor or full-time?","Do you understand the federal pension structure?"],
            options: [
              { text: "Yes — full pension at 30 years, right?", next: 'kindred' },
              { text: "I'd just like to learn about the role.", next: 'lecture' },
              { text: "Pension structure? I'm 25.", next: 'horror' },
            ]
          },
          horror: {
            npc: ["Twenty-five.","You youngs don't think about the LONG game.","Goodbye."],
            end: 'ghosted'
          },
          lecture: {
            npc: ["Before the 'role,' you must understand: GS-13 step 5, 1.1% multiplier, FERS supplement at 62…","(15 minutes pass)","…annual COLA adjustments…","(another 10 minutes)","…and that's why you must NEVER leave the federal government."],
            options: [
              { text: "Got it. About the role —", next: 'pitch' },
              { text: "I'm exhausted.", next: 'horror' },
            ]
          },
          kindred: {
            npc: ["FINALLY","Someone who UNDERSTANDS","I'm hiring a GS-9. Slow advancement, full pension, no pressure ever.","Are you in?"],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "Tell me more.", next: 'pitch' },
            ]
          },
          pitch: {
            npc: ["GS-9 pays $58K. You'll never be promoted. You'll never be fired.","You will retire here in 35 years. Comfortable. Bored.","In?"],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "I want growth.", next: 'horror' },
            ]
          },
          offer: {
            npc: ["Welcome aboard.","First training: 9 hours of mandatory ethics videos from 2003.","See you in 35 years."],
            end: 'success'
          },
        }
      }
    },

    // ── 47. RAINN MORROW — EA cult member who can't shut up about it. ───
    {
      id: 47, name: 'Rainn Morrow', tagline: 'Effective Altruist • Bay Area Rationalist • Researcher', emoji: '🧮',
      bio: "I work on AI safety. I live in a group house called 'The Lighthouse.' We have weekly 'rationalist' meetings where 14 men explain Bayesianism to each other. I will calculate the expected value of our first date.",
      prompt: { q: "I'm convinced", a: "shrimp welfare is the most under-discussed cause area (I can't stop talking about it)" },
      funFacts: [
        "I have donated 92% of my income to malaria nets",
        "I have a lesswrong.com username and a 17,000 karma comment history",
        "I weigh my food on a scale to optimize protein-per-dollar",
      ],
      interests: ['AI Alignment','Shrimp Welfare','Bayes','Group Houses','Polyamory'],
      experience: [
        { role: 'Researcher',  company: 'Center For The Study Of Existential Risk', icon: '🧮' },
        { role: 'Visiting Scholar', company: 'GiveWell',                              icon: '💸' },
      ],
      posts: [
        { time: '2d', text: "Calculated the expected utility of my morning coffee:\n\n+0.4 utils (alertness)\n-2.3 utils (caffeine dependency)\n-180 utils (1 Indonesian farmer's daily wages)\n+0.001 utils (shrimp didn't suffer)\n\nNet: -181.9 utils. Skipping coffee. The math demands it.",
          likes: 2402, reposts: 412 },
      ],
      comments: [
        { author: 'Fellow EA',     text: 'Inspiring rigor 🧮', neg: false },
        { author: 'Normal Person', text: 'Just drink the coffee dude', neg: true },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 5, networking: 2, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi.","Quick screening question.","If you could prevent one of the following: (a) one human death, (b) 4,000 chicken deaths, or (c) 80,000 shrimp deaths… which?"],
            options: [
              { text: "The human, obviously.", next: 'judgey' },
              { text: "The chickens — utility math says so.", next: 'maybe' },
              { text: "The shrimp. They suffer at scale.", next: 'love' },
              { text: "I'm not playing this game.", next: 'judgey' },
            ]
          },
          judgey: {
            npc: ["A speciesist.","Disappointing.","I'd hoped for a more rigorous mind."],
            end: 'failed'
          },
          maybe: {
            npc: ["Acceptable starting answer.","But have you read the recent Open Philanthropy report on hen welfare?"],
            options: [
              { text: "Yes — fascinating.", next: 'love' },
              { text: "No, but I'd love to.", next: 'love' },
            ]
          },
          love: {
            npc: ["A kindred mind 🧮","I'm hiring a Junior Researcher. $90K. You'll work on shrimp welfare and AI alignment simultaneously.","Both are existentially urgent. (One arguably is.)","In?"],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "Just shrimp welfare?", next: 'love2' },
            ]
          },
          love2: {
            npc: ["Even better. Pure focus.","$80K. Shrimp only.","In?"],
            options: [
              { text: "In.", next: 'offer' },
            ]
          },
          offer: {
            npc: ["Welcome.","First task: read 14 papers by Friday.","Also you'll be moving into The Lighthouse. We have a free room."],
            end: 'success'
          },
        }
      }
    },

    // ── 48. BAILEY THORNDIKE — Substack pundit who is a Brave Truth Teller. ─
    {
      id: 48, name: 'Bailey Thorndike', tagline: 'Independent Journalist • Substack: 47K Subs', emoji: '✍️',
      bio: "I left mainstream media because I couldn't be 'truly free.' Now I write 8,000-word Substacks about being canceled (I wasn't). I'm a 'centrist' who only attacks one side. My subscribers are 80% boomers.",
      prompt: { q: "I'll know we're soulmates when", a: "you defend my right to publish a take I don't even believe in (it gets engagement)" },
      funFacts: [
        "My most viral post is titled 'I am NOT canceled but…'",
        "I have a podcast called 'The Free Press' that is not free (paywall)",
        "I live in Brooklyn but write columns about 'real Americans'",
      ],
      interests: ['Substack','Discourse','Free Speech','Cancel Culture','Picking Fights On Twitter'],
      experience: [
        { role: 'Founder',         company: 'The Brave Take (Substack)',  icon: '✍️' },
        { role: 'Former Columnist', company: 'A respectable newspaper',     icon: '📰' },
        { role: 'Twitter Personality', company: '180K followers, 4 fights/day', icon: '🐦' },
      ],
      posts: [
        { time: '4h', text: "I have been canceled.\n\n(I have not been canceled. I have a Substack with 47K paid subscribers and a podcast deal. But the THREAT of cancellation is real.)\n\nThis is why I'm starting a 'Free Speech Mastermind' for $497/month. Subscribe to support truth.",
          likes: 8401, reposts: 1404 },
      ],
      comments: [
        { author: 'Subscriber',  text: 'You speak for us all 🙏', neg: false },
        { author: 'Honest Reader', text: 'Bailey you literally have a column at the Times', neg: true },
      ],
      requirements: { looks: 2, charisma: 3, smarts: 3, networking: 2, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hi.","Quick test — are you ideologically captured?"],
            options: [
              { text: "I don't think so?", next: 'maybe' },
              { text: "Define 'captured'.", next: 'maybe' },
              { text: "This is a weird opener.", next: 'mad' },
            ]
          },
          mad: {
            npc: ["You ARE captured.","Confirmed.","Goodbye."],
            end: 'failed'
          },
          maybe: {
            npc: ["Acceptable.","I'm hiring a Researcher to fact-check my 'fact-checks.'","$45K. You'll be 'free' (uninsured)."],
            options: [
              { text: "I'll take it.", next: 'gotcha' },
              { text: "Why $45K?", next: 'lecture' },
              { text: "Pass.", next: 'mad' },
            ]
          },
          lecture: {
            npc: ["Money is captured thinking.","I MAKE $1.4M from Substack but I can't pay you because of THE SYSTEM.","Are you in or are you a coward?"],
            options: [
              { text: "Fine, I'll take it.", next: 'gotcha' },
              { text: "Pass.", next: 'mad' },
            ]
          },
          gotcha: {
            npc: ["Welcome to the team.","Actually — I forgot — I need you to BUY my $497 'Brave Truth' course first.","Then we'll talk about the role."],
            options: [
              { text: "I'll buy it.", next: 'scammed' },
              { text: "Lol no.", next: 'mad' },
            ]
          },
          scammed: {
            npc: ["EXCELLENT","Sending the link.","Your 'role' will start in 'six months' (it never starts.)"],
            end: 'scammed'
          },
        }
      }
    },

    // ── 49. PATTY SCRIVENER — Boomer entering tech at 67. ───────────────
    {
      id: 49, name: 'Patty Scrivener', tagline: 'Career Pivot • New To Tech • Empty Nester', emoji: '👵',
      bio: "I'm 67 and just decided to 'get into tech.' My grandson is teaching me JavaScript. I have a portfolio site he made. I am genuinely lovely. I will accidentally email you the password to everything.",
      prompt: { q: "Most spontaneous thing I've done", a: "asked my granddaughter what 'API' meant — she explained it for 3 hours" },
      funFacts: [
        "I have written a hello-world program and printed it out",
        "My portfolio is on Wix",
        "I keep my passwords in a spiral notebook called 'PASSWORDS'",
      ],
      interests: ['Coding (Trying)','My Grandkids','Costco Brunch','Refusing To Use Slack','Patience'],
      experience: [
        { role: 'Career Pivot Trainee', company: 'Online bootcamp',     icon: '👵' },
        { role: 'Retired Teacher',      company: 'Public School (40 yrs)', icon: '🍎' },
      ],
      posts: [
        { time: '1d', text: "Hello LinkedIn! 👋\n\nMy name is Patty. I am 67 years old. I retired from teaching last year and decided I wanted to learn 'computers.'\n\nI just finished my first 'website.' My grandson Toby helped me a great deal. I'm so proud!\n\nWould someone please give me a job? I am very willing to learn and I make excellent banana bread.",
          likes: 124502, reposts: 24503 },
      ],
      comments: [
        { author: 'Internet Strangers', text: 'PATTY WE LOVE YOU', neg: false },
        { author: 'Twitter Hivemind',  text: 'Someone hire Patty PLEASE', neg: false },
        { author: 'Fellow Retiree',    text: 'You go Patty!', neg: false },
      ],
      requirements: { looks: 1, charisma: 3, smarts: 2, networking: 1, nepotism: 0 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hello dear!","I just figured out how to message on this 'app'!","Are you the person to talk to about a 'job'? My grandson says I should ask."],
            options: [
              { text: "Hi Patty! What kind of role are you looking for?", next: 'kind' },
              { text: "I might be hiring, what can you do?", next: 'kind' },
              { text: "I'm not hiring, sorry.", next: 'gentle_no' },
            ]
          },
          gentle_no: {
            npc: ["Oh! That's quite alright dear.","I baked banana bread today, would you like the recipe anyway?","No? Okay. Have a lovely day! 👵"],
            end: 'ghosted'
          },
          kind: {
            npc: ["Oh wonderful!","I am 67. I taught fourth grade for 40 years.","I have just learned 'JavaScript' — I think that's how it's spelled?","I am very kind, very organized, and I bring snacks."],
            options: [
              { text: "Honestly, you sound great. I'll mentor you.", next: 'mentor' },
              { text: "Patty I'd love to give you a real shot.", next: 'offer' },
              { text: "I don't think you're a fit, sorry.", next: 'gentle_no' },
            ]
          },
          mentor: {
            npc: ["Oh dear that's so kind.","I will take all the help I can get.","Toby (my grandson) will be so proud.","Thank you, truly.","🥹"],
            end: 'success'
          },
          offer: {
            npc: ["You're going to give me a CHANCE?","Oh dear.","I'm going to call my whole family.","I will not let you down. I'm going to bring banana bread to the office every Monday.","Oh dear oh dear. 🥹"],
            end: 'success'
          },
        }
      }
    },

    // ── 50. JEREMY HOLLAND — Quiet quitter who tells you to quiet quit. ─
    {
      id: 50, name: 'Jeremy Holland', tagline: 'Anti-Work Advocate • Quiet Quitter • Gen X Survivor', emoji: '😴',
      bio: "I have been at my company for 11 years and have not done meaningful work in 7 of them. I am the unofficial 'Director of Doing The Bare Minimum.' I will teach you the ways. (For free. I respect your time.)",
      prompt: { q: "Best advice I've ever received", a: "'Looking busy is 90% of the job.' I have made a career of it." },
      funFacts: [
        "I respond to emails 4 days late on purpose",
        "I have been 'in a meeting' from 11am to 4pm every Tuesday for 6 years",
        "My calendar is 80% blocked with 'focus time' (naps)",
      ],
      interests: ['Doing Nothing','Looking Busy','Mid-day Naps','Fake Calendar Blocks','Long Lunches'],
      experience: [
        { role: 'Senior Specialist', company: 'A company (11 yrs, no movement)', icon: '😴' },
      ],
      posts: [
        { time: '2d', text: "Friend: 'How do you have so much free time?'\n\nMe: I have mastered the art of LOOKING busy.\n\n- Calendar blocked with fake meetings\n- Slack status: 'in deep work'\n- Reply to one email at 11pm to seem dedicated\n- Take a 3-hour 'lunch'\n\nI haven't done real work since 2017. My boss thinks I'm a high performer.",
          likes: 89402, reposts: 14502 },
      ],
      comments: [
        { author: 'Anti-Work Crew', text: 'JEREMY THE PROPHET 🙏', neg: false },
        { author: 'His Manager',    text: 'Jeremy what do you actually do', neg: true },
      ],
      requirements: { looks: 1, charisma: 2, smarts: 2, networking: 1, nepotism: 1 },
      chat: {
        start: 'open',
        nodes: {
          open: {
            npc: ["Hey","I'm not really 'hiring' but I'll talk","what's your goal here"],
            options: [
              { text: "I want to actually do meaningful work.", next: 'horror' },
              { text: "Honestly I just want to coast.", next: 'kindred' },
              { text: "I want a job that pays me to do nothing.", next: 'kindred' },
            ]
          },
          horror: {
            npc: ["lol","'meaningful work'","you'll be burnt out in 2 years","good luck with that","🫡"],
            end: 'ghosted'
          },
          kindred: {
            npc: ["my friend","my comrade","i can teach you the ways","i can refer you to a position at my company","Senior Specialist II — I'll vouch for you","you'll do nothing. you'll be promoted in 6 years."],
            options: [
              { text: "I'm in.", next: 'offer' },
              { text: "Do I have to interview?", next: 'easy' },
            ]
          },
          easy: {
            npc: ["i told my boss you're 'a unicorn'","he didn't ask any questions","there is no interview","it's 2024 brother nobody cares"],
            options: [
              { text: "Sounds great.", next: 'offer' },
            ]
          },
          offer: {
            npc: ["welcome to the bare minimum","first day: arrive at 10:15","leave at 3:45","email me one (1) thing so we both look productive","🫡"],
            end: 'success'
          },
        }
      }
    },

];

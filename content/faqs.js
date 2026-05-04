const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "I've never had counselling before. What should I expect?",
        a: "Mostly, a conversation. Your first session is not a formal assessment and there's nothing you need to prepare. I'll ask what's brought you here and we'll talk about what you're hoping to get from it. You don't need to have the words ready or anything figured out. Most people find it less daunting than they expected."
      },
      {
        q: "I'm not sure counselling is right for me. Does that matter?",
        a: "Not at all. Uncertainty is one of the most common reasons people get in touch. You don't need to be convinced it will work before you try it. The free first session is exactly for this. It gives you a chance to ask questions, get a feel for how I work, and decide whether it feels worth continuing. There's no commitment attached to it."
      },
      {
        q: "Do I need to know what I want to talk about before I come?",
        a: "No. Some people arrive with a clear sense of what they want to work on. Others just know that something isn't right and can't put their finger on exactly what. Both are fine. Part of what counselling does is help you make sense of what you're carrying, so you don't need to have that worked out in advance."
      },
      {
        q: "What is the free first session?",
        a: "It's a no-obligation conversation, usually around 50 minutes, where you can talk about what's brought you here and what you're hoping to get from counselling. It gives you a chance to see how I work and whether it feels like a good fit. There's no pressure to continue and no charge if you decide it's not for you."
      },
      {
        q: "How long does counselling take?",
        a: "There's no fixed answer. It depends on what you're working through and what feels useful. Some people come for six or eight sessions and find that's enough. Others come for much longer. We'll check in as we go, and you decide when you're ready to stop. There's no pressure to keep coming if it stops feeling useful, and no pressure to leave before you're ready."
      }
    ]
  },
  {
    category: "Sessions",
    questions: [
      {
        q: "How long is each session?",
        a: "50 minutes. That's the standard counselling hour. It's enough time to get into something meaningful without feeling like you've been put through the wringer."
      },
      {
        q: "What happens in a session?",
        a: "We talk. That's the honest answer. There's no set format and I'm not going to hand you a worksheet or ask you to do breathing exercises unless that's something we've agreed might help. You bring what's on your mind. I listen, ask questions, reflect things back. Sometimes a session feels like a lot happened. Sometimes it feels quieter. Both are useful."
      },
      {
        q: "What if I start crying or feel overwhelmed?",
        a: "That's completely fine. It happens a lot, and it's not something you need to apologise for or hold back. Sessions are one of the few places where you don't have to manage how you come across. If something hits hard, we can slow down. You're in control of the pace."
      },
      {
        q: "How often should I come?",
        a: "Weekly is most common, especially at the start. It helps build some momentum and means you're not losing the thread between sessions. Some people move to fortnightly once things settle. We can work out what suits you."
      },
      {
        q: "Can I have sessions online or by phone?",
        a: "Yes. I offer face-to-face sessions in Consett, County Durham and online sessions via video. I also offer telephone and walk and talk sessions. Online works well for most people and means you can access support without travelling. You can mix formats too if your week doesn't always allow you to come in person."
      },
      {
        q: "What if I need to cancel?",
        a: "Life gets in the way sometimes. I ask for as much notice as possible, ideally 48 hours. Late cancellations and missed sessions may be charged. I'll be clear about this before we start so there are no surprises."
      }
    ]
  },
  {
    category: "About Neil",
    questions: [
      {
        q: "Are you qualified?",
        a: "I am a qualified integrative counsellor and an Accredited Registrant of the NCPS (MNCPS Acc.). I hold a Level 5 Diploma in Integrative Therapeutic Counselling, work under regular clinical supervision, and practise within the NCPS ethical framework."
      },
      {
        q: "What does integrative mean?",
        a: "It means I've trained across a range of counselling approaches rather than sticking to one fixed model. Person-centred, psychodynamic, CBT-influenced, attachment-based. I draw on whatever seems most useful for the person in front of me. In practice, it means I adapt to you rather than trying to fit you into a particular way of working."
      },
      {
        q: "Do you work with a supervisor?",
        a: "Yes, regularly. Clinical supervision is a professional requirement, not optional. It means I'm discussing my work with an experienced supervisor to make sure I'm supporting you as well as I can. Your identity is never shared. Only anonymised details are discussed."
      },
      {
        q: "Why did you become a counsellor?",
        a: "I came to counselling through real life rather than a textbook. After losing a colleague to suicide, I found myself drawn toward work that gives people somewhere honest to go with what they're carrying. That's the short version. There's more on the About page if you want it."
      }
    ]
  },
  {
    category: "Cost and Cancellations",
    questions: [
      {
        q: "How much does a session cost?",
        a: "My current session fee is listed on the About page and the booking form. The free first session has no charge attached."
      },
      {
        q: "Do you offer reduced rates?",
        a: "Yes, in some circumstances. If cost is a barrier, it's worth asking. The worst I can say is that I can't accommodate it right now."
      },
      {
        q: "Can I use private health insurance?",
        a: "Some policies cover counselling, but it varies a lot by insurer and policy. Check with your provider first. I can tell you what information they'd likely need from me."
      },
      {
        q: "Do I have to commit to a set number of sessions?",
        a: "No. There's no minimum and no contract. Some people find it helpful to book a block for structure. Others prefer to go week by week. Either works."
      }
    ]
  },
  {
    category: "Confidentiality",
    questions: [
      {
        q: "Is what I say kept private?",
        a: "Yes. Everything you share in our sessions is confidential. There are two exceptions: if I believed there was a serious risk of harm to you or someone else, or if I were legally required to disclose something. In either case, I would talk to you about it first wherever possible. I'll explain this properly at our first session."
      },
      {
        q: "Will my GP or employer find out?",
        a: "No. I don't contact your GP, employer, or anyone else. What you share stays between us, subject only to the exceptions above."
      },
      {
        q: "Do you take notes?",
        a: "I keep brief notes to help me track what we're working on between sessions. These are stored securely and aren't shared with anyone. You can ask me about how I handle notes at any time."
      }
    ]
  },
  {
    category: "Specific Situations",
    questions: [
      {
        q: "I'm a man and I've never really talked about my feelings. Is this going to feel awkward?",
        a: "Possibly at first. That's honest. Most people feel a bit awkward in the first session regardless of who they are. But you don't have to arrive already knowing how to talk about feelings. That's part of what we work on together. You can show up exactly as you are and go at whatever pace feels manageable."
      },
      {
        q: "Do I need a diagnosis to access support for neurodivergence?",
        a: "No. I work with people who are formally diagnosed, currently being assessed, or who self-identify as neurodivergent. What matters is your experience, not a piece of paper."
      },
      {
        q: "Can counselling help with work stress or burnout?",
        a: "Yes. It's one of the most common reasons people come. You don't need a dramatic reason to seek support. Feeling worn down or like you can't keep up is enough."
      },
      {
        q: "My partner won't come to counselling. Can it still help me?",
        a: "Yes. Individual counselling can be really useful for relationship difficulties even without your partner. It gives you space to understand your own patterns, process what you're feeling, and work out what you actually want. You can only change what's yours to change, and that's often more than people expect."
      },
      {
        q: "What if I'm in crisis right now?",
        a: "I'm not a crisis service and I can't offer emergency support. If you're struggling to keep yourself safe, please contact the Samaritans on 116 123 (free, 24 hours), call 999, or go to your nearest A&E. My crisis support page has a full list of organisations who can help right now."
      }
    ]
  }
];

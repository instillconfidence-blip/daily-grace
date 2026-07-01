export interface BibleVerse {
  reference: string
  text: string
  theme: string
}

export interface Devotional {
  id: string
  title: string
  scripture: string
  scriptureRef: string
  body: string[]
  prayer: string
  theme: string
  color: string
}

export interface Song {
  id: string
  title: string
  artist: string
  genre: "Worship" | "Contemporary" | "Gospel" | "Hymns" | "Instrumental"
  youtubeId: string
  description: string
}

export interface JournalPrompt {
  id: string
  prompt: string
  theme: string
}

export function getDailyIndex(total: number): number {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const dayOfYear = Math.floor((Date.now() - start.getTime()) / 86400000)
  return dayOfYear % total
}

export const bibleVerses: BibleVerse[] = [
  { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", theme: "Love" },
  { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", theme: "Hope" },
  { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength.", theme: "Strength" },
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", theme: "Trust" },
  { reference: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing.", theme: "Provision" },
  { reference: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", theme: "Renewal" },
  { reference: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", theme: "Rest" },
  { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", theme: "Guidance" },
  { reference: "Psalm 46:10", text: "He says, 'Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.'", theme: "Peace" },
  { reference: "John 14:6", text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'", theme: "Salvation" },
  { reference: "Ephesians 2:8-9", text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.", theme: "Grace" },
  { reference: "Romans 5:8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", theme: "Love" },
  { reference: "Psalm 139:14", text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.", theme: "Identity" },
  { reference: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!", theme: "Transformation" },
  { reference: "Lamentations 3:22-23", text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.", theme: "Faithfulness" },
  { reference: "John 15:5", text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.", theme: "Abiding" },
  { reference: "Philippians 4:7", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", theme: "Peace" },
  { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", theme: "Courage" },
  { reference: "Psalm 27:1", text: "The Lord is my light and my salvation — whom shall I fear? The Lord is the stronghold of my life — of whom shall I be afraid?", theme: "Courage" },
  { reference: "1 John 4:19", text: "We love because he first loved us.", theme: "Love" },
  { reference: "Psalm 34:8", text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.", theme: "Goodness" },
  { reference: "Galatians 2:20", text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.", theme: "Identity" },
  { reference: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.", theme: "Love" },
  { reference: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", theme: "Priority" },
  { reference: "Colossians 3:23", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", theme: "Purpose" },
  { reference: "James 1:2-3", text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.", theme: "Perseverance" },
  { reference: "Psalm 19:14", text: "May these words of my mouth and this meditation of my heart be pleasing in your sight, Lord, my Rock and my Redeemer.", theme: "Prayer" },
  { reference: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", theme: "Character" },
  { reference: "2 Corinthians 12:9", text: "My grace is sufficient for you, for my power is made perfect in weakness.", theme: "Grace" },
  { reference: "Psalm 73:26", text: "My flesh and my heart may fail, but God is the strength of my heart and my portion forever.", theme: "Strength" },
]

export const devotionals: Devotional[] = [
  {
    id: "1",
    title: "The Shepherd's Voice",
    scripture: "The Lord is my shepherd, I lack nothing.",
    scriptureRef: "Psalm 23:1",
    body: [
      "A shepherd in ancient Israel knew each of his sheep by name. He would lead them to green pastures, protect them from predators, and carry the wounded ones close to his heart.",
      "When Jesus says He is the Good Shepherd, He is claiming this same intimate care for you. He knows your name. He knows your fears. He knows the paths you need to walk, even when they feel uncertain.",
      "Today, you lack nothing that truly matters. Not because your circumstances are perfect, but because the One who holds all things is walking with you. Your needs — physical, emotional, spiritual — are known to the God who made you.",
      "What would it mean today to truly trust that Jesus is your shepherd? Not just in theory, but in the moments when you feel lost, tired, or afraid? His voice is gentle. His presence is constant. His care is complete.",
    ],
    prayer: "Lord, forgive me for the times I try to be my own shepherd. Help me today to follow Your voice, to trust in Your provision, and to rest in the knowledge that You are with me. Amen.",
    theme: "Provision",
    color: "green",
  },
  {
    id: "2",
    title: "New Every Morning",
    scripture: "His compassions never fail. They are new every morning.",
    scriptureRef: "Lamentations 3:22-23",
    body: [
      "Lamentations is one of the most raw books in all of Scripture. Written in the aftermath of Jerusalem's destruction, it is a book of grief, loss, and honest lament before God.",
      "Yet right in the middle of this heartbreak, the writer pauses to declare a stunning truth: God's mercies are new every morning. Not because everything is fine — but because God Himself is faithful.",
      "Yesterday's failures don't define today. Yesterday's wounds don't lock you out of grace. Every morning — including this one — arrives wrapped in fresh mercy. The slate is clean. God's love is undiminished.",
      "You don't have to earn your way into His presence today. You don't have to perform. You simply have to receive what He is already offering: a new morning, a fresh start, a compassionate Father.",
    ],
    prayer: "Thank You, Lord, for Your mercies that are new this morning. I receive Your grace today with gratitude. Help me to extend that same fresh mercy to myself and to others. Amen.",
    theme: "Grace",
    color: "amber",
  },
  {
    id: "3",
    title: "Still Waters",
    scripture: "He leads me beside quiet waters, he refreshes my soul.",
    scriptureRef: "Psalm 23:2-3",
    body: [
      "Sheep won't drink from rushing, turbulent water. They need still, calm waters to be safe. The psalmist knew this. And the image he paints — the shepherd leading the sheep to quiet waters — is intentional.",
      "God knows what your soul needs. In a world of noise, notifications, and constant urgency, He leads you toward stillness. Not because He wants you to be passive, but because renewal happens in rest.",
      "When did you last truly be still before God? Not filling the silence with more activity, but simply sitting in His presence? There is a profound gift waiting for you in the quiet.",
      "Today, even if just for five minutes, let yourself be led beside still waters. Let the rushing of your thoughts slow. Let His presence settle over you. Let your soul be refreshed by the One who made it.",
    ],
    prayer: "Jesus, I confess that I often run past the still waters You prepare for me. Today, slow me down. Lead me to the quiet places where my soul can breathe. Refresh me in Your presence. Amen.",
    theme: "Rest",
    color: "blue",
  },
  {
    id: "4",
    title: "Known and Loved",
    scripture: "I praise you because I am fearfully and wonderfully made.",
    scriptureRef: "Psalm 139:14",
    body: [
      "Psalm 139 is one of the most intimate passages in all of Scripture. God searches you, knows you — before a word is on your tongue, He knows it completely. You were knit together by His hands.",
      "And His conclusion? You are wonderful. Not flawed and barely acceptable. Not a disappointment. Wonderfully made.",
      "In a world that constantly measures worth by performance, appearance, and achievement, this is revolutionary. Your worth is not in what you do. It is in what you are: made in the image of God, known completely, loved unconditionally.",
      "Whatever voices have told you otherwise today — the inner critic, the comparison trap, the shadow of past failure — those voices are not telling the truth. The One who made you calls you wonderful.",
    ],
    prayer: "Father, I struggle to believe I am wonderfully made. Help me see myself today the way You see me — not through the lens of my failures, but through the lens of Your love. Amen.",
    theme: "Identity",
    color: "purple",
  },
  {
    id: "5",
    title: "The Vine and the Branches",
    scripture: "Remain in me, as I also remain in you. No branch can bear fruit by itself.",
    scriptureRef: "John 15:4",
    body: [
      "Jesus didn't say 'try harder.' He didn't say 'do more.' He said remain. Abide. Stay connected. The Christian life isn't primarily about effort — it's about connection.",
      "A branch doesn't produce fruit by straining and striving. It produces fruit by staying attached to the vine. The life flows from the vine to the branch, and fruit is the natural result of that connection.",
      "If you've been striving lately — trying to be a 'better Christian,' trying harder to pray more, read more, do more — this verse is an invitation to rest. Not into laziness, but into dependence.",
      "What would it look like today to simply remain in Jesus? To begin your morning by acknowledging your need for Him? The fruit comes from the connection.",
    ],
    prayer: "Lord Jesus, I confess that I often try to produce fruit in my own strength. Teach me what it means to truly abide in You today. I want to be a branch that stays connected to the Vine. Amen.",
    theme: "Abiding",
    color: "emerald",
  },
  {
    id: "6",
    title: "Peace That Passes Understanding",
    scripture: "The peace of God, which transcends all understanding, will guard your hearts.",
    scriptureRef: "Philippians 4:7",
    body: [
      "Paul wrote Philippians from prison. Not from a comfortable chair, but from chains. And yet this letter is saturated with joy and peace.",
      "He doesn't promise that your circumstances will make sense. He promises a peace that transcends — goes beyond, exceeds — understanding. A peace your mind can't manufacture on its own.",
      "This peace is a gift. It comes after prayer, thanksgiving, and presenting your requests to God. Not because the formula works, but because when you turn toward God with your anxieties, you encounter His presence — and His presence changes everything.",
      "The word 'guard' here is a military term. God's peace is like a sentinel, standing watch over your heart and mind. When anxiety storms the gates, peace holds them firm. This is available to you today.",
    ],
    prayer: "God, I bring You my anxieties right now. I choose thanksgiving even in uncertainty. Fill me with Your peace — the kind that doesn't depend on my circumstances. Amen.",
    theme: "Peace",
    color: "sky",
  },
  {
    id: "7",
    title: "Sufficient Grace",
    scripture: "My grace is sufficient for you, for my power is made perfect in weakness.",
    scriptureRef: "2 Corinthians 12:9",
    body: [
      "Paul had asked God three times to remove a painful 'thorn in the flesh.' God's answer was not a yes. It was something better: enough grace for the thorn.",
      "We often pray for God to remove our weaknesses, our pain, our limitations. But God sometimes answers those prayers by transforming our relationship to our weakness rather than by removing it.",
      "Your limitations are not failures of faith. Your struggles are not evidence that God has abandoned you. They are the very places where His power can be displayed most clearly — when you're clearly not enough, and yet somehow carry on.",
      "Today, whatever weakness you're aware of is an invitation. Not to try harder. But to let His grace be your sufficiency there. His strength shows up where yours runs out.",
    ],
    prayer: "Lord, I'm tired of pretending to be strong. Here are my weaknesses. I believe Your grace is sufficient. Show Your strength in these exact places. Amen.",
    theme: "Grace",
    color: "rose",
  },
]

export const journalPrompts: JournalPrompt[] = [
  { id: "1", prompt: "What is one way you saw God's goodness in the past 24 hours, even in a small thing?", theme: "Gratitude" },
  { id: "2", prompt: "What burden are you carrying today that you need to surrender to Jesus?", theme: "Surrender" },
  { id: "3", prompt: "How has God's faithfulness shown up in your life this past week?", theme: "Faithfulness" },
  { id: "4", prompt: "What does it mean for YOU that Jesus calls you 'beloved'? How does that change how you see yourself today?", theme: "Identity" },
  { id: "5", prompt: "Write a prayer of thanksgiving — list at least five specific things you're grateful for right now.", theme: "Gratitude" },
  { id: "6", prompt: "Is there someone in your life who needs your grace today? What would forgiving or showing mercy look like?", theme: "Grace" },
  { id: "7", prompt: "What area of your life feels most disconnected from God right now? What would reconnecting look like?", theme: "Abiding" },
  { id: "8", prompt: "If Jesus were to sit across from you right now and ask 'What do you need most from me today?' — what would your honest answer be?", theme: "Prayer" },
  { id: "9", prompt: "What fear has been whispering to you lately? How does the truth of Scripture speak to that fear?", theme: "Courage" },
  { id: "10", prompt: "Describe a time when you experienced God's presence in an unexpected way. What did that feel like?", theme: "Presence" },
  { id: "11", prompt: "What does your relationship with God look like right now compared to six months ago? What has grown? What has been hard?", theme: "Growth" },
  { id: "12", prompt: "Write about someone whose faith inspires you. What do you want to emulate in your own walk?", theme: "Inspiration" },
  { id: "13", prompt: "What would it look like to seek God's kingdom first in ONE practical area of your life this week?", theme: "Priority" },
  { id: "14", prompt: "Is there a sin or habit that keeps pulling you away from God? Write an honest prayer about it.", theme: "Honesty" },
  { id: "15", prompt: "How has a difficult season in your life grown your faith? What did God teach you through it?", theme: "Growth" },
  { id: "16", prompt: "What promise from Scripture is most meaningful to you right now? Why does it resonate?", theme: "Scripture" },
  { id: "17", prompt: "Write a letter to God about something you've been too busy to tell Him lately.", theme: "Honesty" },
  { id: "18", prompt: "Where do you feel God calling you to grow in the next season of your life?", theme: "Growth" },
  { id: "19", prompt: "What does it mean to you that Jesus is always interceding for you? How does that change your view of prayer?", theme: "Prayer" },
  { id: "20", prompt: "What person or situation do you need to pray for more faithfully? Write a prayer for them now.", theme: "Prayer" },
  { id: "21", prompt: "How has worship — music, nature, community — helped you connect with God recently?", theme: "Worship" },
  { id: "22", prompt: "What is one area where you struggle to trust God? What would surrendering that look like today?", theme: "Trust" },
  { id: "23", prompt: "Write about what you believe Heaven will be like and how that hope changes how you live today.", theme: "Hope" },
  { id: "24", prompt: "What does God's grace mean to you personally — not theologically, but in your everyday experience?", theme: "Grace" },
  { id: "25", prompt: "How are you practically loving others the way Christ loves you this week?", theme: "Love" },
  { id: "26", prompt: "What Scripture has been most alive to you lately? Write it out and explain why it speaks to you.", theme: "Scripture" },
  { id: "27", prompt: "Write about a moment when you clearly heard or sensed God's guidance. How did you respond?", theme: "Guidance" },
  { id: "28", prompt: "What do you need to repent of today? Write an honest prayer of confession and receive His forgiveness.", theme: "Honesty" },
  { id: "29", prompt: "How has community — other believers — shown you the love of Jesus recently?", theme: "Community" },
  { id: "30", prompt: "At the end of this day, what kind of faith-filled moment do you hope to look back on?", theme: "Intentionality" },
]

export const songs: Song[] = [
  { id: "1", title: "What a Beautiful Name", artist: "Hillsong Worship", genre: "Worship", youtubeId: "nQWFzMkCcSQ", description: "A breathtaking anthem about the power and majesty of Jesus' name" },
  { id: "2", title: "Good Good Father", artist: "Chris Tomlin", genre: "Contemporary", youtubeId: "CqybaIesbuA", description: "A reminder of God's unfailing love as our perfect Father" },
  { id: "3", title: "You Say", artist: "Lauren Daigle", genre: "Contemporary", youtubeId: "sIaT8Jl2zpI", description: "Finding identity in what God says about us, not what the world says" },
  { id: "4", title: "Goodness of God", artist: "Bethel Music", genre: "Worship", youtubeId: "XBHGRm40tC0", description: "A testimony of God's faithfulness and goodness through every season" },
  { id: "5", title: "Living Hope", artist: "Phil Wickham", genre: "Worship", youtubeId: "pnMIQz07YBQ", description: "The resurrection as our living, unshakeable hope for today and eternity" },
  { id: "6", title: "O Come to the Altar", artist: "Elevation Worship", genre: "Worship", youtubeId: "jtQMONFaRIQ", description: "An invitation to bring every burden and broken piece to Jesus" },
  { id: "7", title: "I Can Only Imagine", artist: "MercyMe", genre: "Contemporary", youtubeId: "T7-tFnRDXuA", description: "Imagining the glorious moment we finally meet Jesus face to face" },
  { id: "8", title: "10,000 Reasons (Bless the Lord)", artist: "Matt Redman", genre: "Worship", youtubeId: "DXDGE_lRI0E", description: "A song of faithful thanksgiving in every season of life" },
  { id: "9", title: "How Great Is Our God", artist: "Chris Tomlin", genre: "Worship", youtubeId: "ZiwnuszYFE8", description: "A global declaration of God's overwhelming greatness and majesty" },
  { id: "10", title: "Amazing Grace (My Chains Are Gone)", artist: "Chris Tomlin", genre: "Hymns", youtubeId: "1PntHSbxmO8", description: "The beloved hymn reimagined — grace that breaks every chain" },
  { id: "11", title: "Who Am I", artist: "Casting Crowns", genre: "Contemporary", youtubeId: "pJnLvCxKgAE", description: "A humbling reflection on the mystery of God's grace toward us" },
  { id: "12", title: "Great Are You Lord", artist: "All Sons & Daughters", genre: "Worship", youtubeId: "mWb0KCT3beg", description: "A gentle, reverent declaration of God's greatness and our dependence" },
  { id: "13", title: "Graves Into Gardens", artist: "Elevation Worship", genre: "Worship", youtubeId: "MrAHSMJMxFo", description: "God who turns our darkest, deadest places into gardens of new life" },
  { id: "14", title: "King of My Heart", artist: "Bethel Music", genre: "Worship", youtubeId: "F4GAnbu1GHE", description: "Surrendering every part of ourselves to Jesus as Lord and King" },
  { id: "15", title: "Way Maker", artist: "Leeland", genre: "Worship", youtubeId: "iom2TNGfDiM", description: "A declaration of who God is — even when we can't see what He's doing" },
  { id: "16", title: "Cornerstone", artist: "Hillsong Worship", genre: "Worship", youtubeId: "i6Onf6PVsDw", description: "Christ as the unshakeable foundation on which our faith is built" },
  { id: "17", title: "Blessed Assurance", artist: "Crowder", genre: "Hymns", youtubeId: "5PPPQMWw53k", description: "The classic hymn of assurance in the promise of God's salvation" },
  { id: "18", title: "Oceans (Where Feet May Fail)", artist: "Hillsong United", genre: "Worship", youtubeId: "dy9nwe9_xzw", description: "A prayer of trust and surrender as we step out in faith" },
  { id: "19", title: "Build My Life", artist: "Housefires", genre: "Contemporary", youtubeId: "sKAcP3nC-xk", description: "Choosing to build our lives on the worthy name of Jesus" },
  { id: "20", title: "Do It Again", artist: "Elevation Worship", genre: "Worship", youtubeId: "YKRGVmFyNms", description: "Trusting in the God who moves — remembering His faithfulness in the past" },
]

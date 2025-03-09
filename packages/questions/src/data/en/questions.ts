const questions = [
  // Dimension P: Psychological capital - Self-efficacy beliefs (facet 1)
  {
    id: '43c98ce8-a07a-4dc2-80f6-c1b2a2485f06',
    text: 'When facing difficult tasks, I am certain that I will accomplish them',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  {
    id: '0727def6-3d18-4221-bf38-86b58f9f3eed',
    text: 'In general, I think that I can obtain outcomes that are important to me',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  {
    id: 'f6076eea-56ae-4b46-97f1-5f94a7676c96',
    text: 'I believe I can succeed at most any endeavor to which I set my mind',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  {
    id: '28ab59a0-e7cd-4fce-94e3-bba2ecc023b6',
    text: 'I will be able to successfully overcome many challenges',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  {
    id: 'ce2fbbf8-7a97-4199-bda5-117e4ecdf3b6',
    text: 'I am confident that I can perform effectively on many different tasks',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  {
    id: 'b2d9ef74-73f5-4ea8-b00c-7aaca15937df',
    text: 'Even when things are tough, I can perform quite well',
    keyed: 'plus',
    domain: 'P',
    facet: 1
  },
  
  // Dimension P: Psychological capital - Optimism (facet 2)
  {
    id: '79186f48-e7fa-4df4-b74b-b0627ee244e1',
    text: 'In uncertain times, I usually expect the best',
    keyed: 'plus',
    domain: 'P',
    facet: 2
  },
  {
    id: '458f3957-2359-4077-ade1-34525d633063',
    text: 'If something can go wrong for me, it will',
    keyed: 'minus',
    domain: 'P',
    facet: 2
  },
  {
    id: 'cda1ca17-b599-4561-a6cd-ff9d36062d27',
    text: 'I always look on the bright side of things',
    keyed: 'plus',
    domain: 'P',
    facet: 2
  },
  {
    id: 'e2028ad3-b128-4f76-be57-398bfe2aff22',
    text: 'I\'m always optimistic about my future',
    keyed: 'plus',
    domain: 'P',
    facet: 2
  },
  {
    id: '7f92ab2c-265c-4b84-8c74-09f9bb9d41a7',
    text: 'I hardly ever expect things to go my way',
    keyed: 'minus',
    domain: 'P',
    facet: 2
  },
  {
    id: '6f66cdc0-9044-457b-b40d-501ecae15ee7',
    text: 'Things never work out the way I want them to',
    keyed: 'minus',
    domain: 'P',
    facet: 2
  },
  {
    id: 'd50a597f-632b-4f7b-89e6-6d85b50fd1c9',
    text: 'I\'m a believer in the idea that "every cloud has a silver lining"',
    keyed: 'plus',
    domain: 'P',
    facet: 2
  },
  {
    id: 'ccf3a5c8-fb50-4bd4-8e7a-22af3d657279',
    text: 'I rarely count on good things happening to me',
    keyed: 'minus',
    domain: 'P',
    facet: 2
  },
  
  // Dimension P: Psychological capital - Resilience (facet 3)
  {
    id: '2f519935-92e8-48ad-9746-4a0f8b38466a',
    text: 'I tend to bounce back quickly after hard times',
    keyed: 'plus',
    domain: 'P',
    facet: 3
  },
  {
    id: 'b5919f2f-cded-4745-a9ce-c02703cee807',
    text: 'I have a hard time making it through stressful events',
    keyed: 'minus',
    domain: 'P',
    facet: 3
  },
  {
    id: '5e8550d7-b8ef-4905-950a-f81d735d39e2',
    text: 'It does not take me long to recover from a stressful event',
    keyed: 'plus',
    domain: 'P',
    facet: 3
  },
  {
    id: 'f110fc66-2e9e-413c-920b-19f05e63d7ac',
    text: 'It is hard for me to snap back when something bad happens',
    keyed: 'minus',
    domain: 'P',
    facet: 3
  },
  {
    id: 'c7f53c3c-2e77-432f-bb71-7470b67d3aa9',
    text: 'I usually come through difficult times with little trouble',
    keyed: 'plus',
    domain: 'P',
    facet: 3
  },
  {
    id: '48a761ef-438e-409b-ae59-ea2ce8f84414',
    text: 'I tend to take a long time to get over set-backs in my life',
    keyed: 'minus',
    domain: 'P',
    facet: 3
  },
  
  // Dimension P: Psychological capital - Hope (facet 4)
  {
    id: 'b7fc949b-02b6-4cb9-a3e2-dbb3d824b55f',
    text: 'If I should find myself in a jam, I could think of many ways to get out of it',
    keyed: 'plus',
    domain: 'P',
    facet: 4
  },
  {
    id: 'e1e804c7-4a1d-498f-8610-f95147af9d1d',
    text: 'At the present time, I am energetically pursuing my goals',
    keyed: 'plus',
    domain: 'P',
    facet: 4
  },
  {
    id: 'fd50e1ca-d9e0-4037-a7a1-a191d4db2d96',
    text: 'There are lots of ways around any problem that I am facing now',
    keyed: 'plus',
    domain: 'P',
    facet: 4
  },
  {
    id: 'af55f014-788c-4b6e-92c4-b2b59dc8a28d',
    text: 'Right now I see myself as being pretty successful',
    keyed: 'plus',
    domain: 'P',
    facet: 4
  },
  {
    id: '888dd864-7449-4e96-8d5c-7a439603ea91',
    text: 'I can think of many ways to reach my current goals',
    keyed: 'plus',
    domain: 'P',
    facet: 4
  },
  {
    id: '73d84e5d-cbf5-47f0-b8cb-4d2159a52e32',
    text: 'At this time, I am meeting the goals that I have set for myself',
    keyed: 'plus',
    domain: 'P',
    facet: 4
  },
  
  // Dimension S: Social orientations - Self-interest (taker) (facet 1)
  {
    id: '899c3f66-51d0-46ea-963a-6fc36d3b3cb9',
    text: 'At work I am concerned about my own needs and interests',
    keyed: 'plus',
    domain: 'S',
    facet: 1
  },
  {
    id: '5a5fa975-d024-4ac8-8845-2823f957c21b',
    text: 'At work my personal goals and aspirations are important to me',
    keyed: 'plus',
    domain: 'S',
    facet: 1
  },
  {
    id: '48ad12ce-470e-4339-90ac-ea8c43a0103e',
    text: 'At work I consider my own wishes and desires to be relevant',
    keyed: 'plus',
    domain: 'S',
    facet: 1
  },
  
  // Dimension S: Social orientations - Reciprocation wariness (taker) (facet 2)
  {
    id: 'cae55842-8957-4e3b-83b3-ceff98fb9dcf',
    text: 'It generally pays to let others do more for you than you do for them',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: 'bd9eec0a-b68b-472c-8803-7db29c308cdb',
    text: 'In the long run, it\'s better to accept favors than to do favors for others',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: '987efee2-899f-4a65-b9b5-1589ef0460d7',
    text: 'You shouldn\'t offer to help someone if they don\'t ask for your help',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: '0cf79e27-e702-45c2-9471-04ac96b58e0e',
    text: 'You should help others so that later they\'ll help you',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: '481efd08-c810-43b1-a952-f8ac9052f96b',
    text: 'You should not bend over backwards to help another person',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: '08ff6dca-02a5-4aeb-aaa4-2ecf2526f143',
    text: 'I feel used when people ask favors of me',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: '71029381-3908-4c68-91e1-e41fb45542a2',
    text: 'You should help others without expecting something in return',
    keyed: 'minus',
    domain: 'S',
    facet: 2
  },
  {
    id: '7dab2a37-8635-4fc7-86b7-0abf13c183c9',
    text: 'Asking for another\'s help gives them power over your life',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  {
    id: '8af754f2-68e9-48f3-8c5d-2e6633d4472c',
    text: 'You seldom benefit from giving a lot in a relationship with others',
    keyed: 'plus',
    domain: 'S',
    facet: 2
  },
  
  // Dimension S: Social orientations - Other orientation (giver) (facet 3)
  {
    id: '9f13dcc8-7b7e-4d9d-8b1f-7a3b8c60999b',
    text: 'At work I am concerned about the needs and interests of others such as my colleagues',
    keyed: 'plus',
    domain: 'S',
    facet: 3
  },
  {
    id: 'a9c97d6b-f616-4c8e-9e01-511a67b3f48d',
    text: 'At work the goals and aspirations of colleagues are important to me',
    keyed: 'plus',
    domain: 'S',
    facet: 3
  },
  {
    id: 'b243e3ae-7272-4271-a610-f6eba4ee9225',
    text: 'At work I consider others\' wishes and desires to be relevant',
    keyed: 'plus',
    domain: 'S',
    facet: 3
  },
  
  // Dimension S: Social orientations - Creditor ideology (giver) (facet 4)
  {
    id: 'c9a7bc2e-697b-4c29-8af5-9c57c29f7c7e',
    text: 'If someone does something for you, you should do something of greater value for them',
    keyed: 'plus',
    domain: 'S',
    facet: 4
  },
  {
    id: 'd1fc4e7a-3285-4750-a0d8-56726cf198c4',
    text: 'If someone does you a favor, you should do even more in return',
    keyed: 'plus',
    domain: 'S',
    facet: 4
  },
  {
    id: 'e234f4a5-8e83-42f7-91d3-1e51f47c8d38',
    text: 'If someone goes out of their way to help me, I feel as though I should do more for them than merely return the favor',
    keyed: 'plus',
    domain: 'S',
    facet: 4
  },
  
  // Dimension W: Work goal orientations - Learning orientation (facet 1)
  {
    id: 'f3e5c7c9-3467-4a21-9c1f-c60433e8cb92',
    text: 'I am willing to select a challenging work assignment that I can learn a lot from',
    keyed: 'plus',
    domain: 'W',
    facet: 1
  },
  {
    id: 'g4d97ae2-57f8-4b31-a280-d92eb8f33751',
    text: 'I often look for opportunities to develop new skills and knowledge',
    keyed: 'plus',
    domain: 'W',
    facet: 1
  },
  {
    id: 'h5c47db3-692a-4c42-b391-e83f9g34i865',
    text: 'I enjoy challenging and difficult tasks at work where I\'ll learn new skills',
    keyed: 'plus',
    domain: 'W',
    facet: 1
  },
  {
    id: 'i6b87ec4-783b-4d53-c4a2-f94g0h45j976',
    text: 'For me, development of my work ability is important enough to take risks',
    keyed: 'plus',
    domain: 'W',
    facet: 1
  },
  
  // Dimension W: Work goal orientations - Competitive performance orientation (facet 2)
  {
    id: 'j7a97fd5-894c-5e64-d5b3-g05h1i56k087',
    text: 'I prefer to work in situations that require a high level of ability and talent',
    keyed: 'plus',
    domain: 'W',
    facet: 2
  },
  {
    id: 'k8b08ge6-905d-6f75-e6c4-h16i2j67l198',
    text: 'I\'m concerned with showing that I can perform better than my co-workers',
    keyed: 'plus',
    domain: 'W',
    facet: 2
  },
  {
    id: 'l9c19hf7-016e-7g86-f7d5-i27j3k78m209',
    text: 'I try to figure out what it takes to prove my ability to others at work',
    keyed: 'plus',
    domain: 'W',
    facet: 2
  },
  {
    id: 'm0d20ig8-127f-8h97-g8e6-j38k4l89n310',
    text: 'I enjoy it when others at work are aware of how well I am doing',
    keyed: 'plus',
    domain: 'W',
    facet: 2
  },
  
  // Dimension W: Work goal orientations - Avoidance orientation (facet 3)
  {
    id: 'n1e31jh9-238g-9i08-h9f7-k49l5m90o421',
    text: 'I would avoid taking on a new task if there was a chance that I would appear rather incompetent to others',
    keyed: 'plus',
    domain: 'W',
    facet: 3
  },
  {
    id: 'o2f42ki0-349h-0j19-i0g8-l50m6n01p532',
    text: 'Avoiding a show of low ability is more important to me than learning a new skill',
    keyed: 'plus',
    domain: 'W',
    facet: 3
  },
  {
    id: 'p3g53lj1-450i-1k20-j1h9-m61n7o12q643',
    text: 'I\'m concerned about taking on a new task at work if my performance would reveal that I had low ability',
    keyed: 'plus',
    domain: 'W',
    facet: 3
  },
  {
    id: 'q4h64mk2-561j-2l31-k2i0-n72o8p23r754',
    text: 'I prefer to avoid situations at work where I might perform poorly',
    keyed: 'plus',
    domain: 'W',
    facet: 3
  },
  
  // Dimension E: Entrepreneurial Orientation - Autonomy (facet 1)
  {
    id: 'r5i75nl3-672k-3m42-l3j1-o83p9q34s865',
    text: 'I support the efforts of individuals and/or teams that work autonomously',
    keyed: 'plus',
    domain: 'E',
    facet: 1
  },
  {
    id: 's6j86om4-783l-4n53-m4k2-p94q0r45t976',
    text: 'I believe that the best results occur when individuals and/or teams decide for themselves what business opportunities to pursue',
    keyed: 'plus',
    domain: 'E',
    facet: 1
  },
  {
    id: 't7k97pn5-894m-5o64-n5l3-q05r1s56u087',
    text: 'I encourage individuals and/or teams to pursue business opportunities and make decisions on their own without constantly referring to their supervisors',
    keyed: 'plus',
    domain: 'E',
    facet: 1
  },
  {
    id: 'u8l08qo6-905n-6p75-o6m4-r16s2t67v198',
    text: 'In my organization, I and the top management team (rather than employee initiatives and input) play a major role in identifying and selecting the entrepreneurial opportunities my organization pursues',
    keyed: 'minus',
    domain: 'E',
    facet: 1
  },
  
  // Dimension E: Entrepreneurial Orientation - Risk Taking (facet 2)
  {
    id: 'v9m19rp7-016o-7q86-p7n5-s27t3u78w209',
    text: 'I have a strong preference for low-risk projects',
    keyed: 'minus',
    domain: 'E',
    facet: 2
  },
  {
    id: 'w0n20sq8-127p-8r97-q8o6-t38u4v89x310',
    text: 'I believe that, owing to the nature of the environment, it is best to explore the environment gradually via careful, incremental behavior',
    keyed: 'minus',
    domain: 'E',
    facet: 2
  },
  {
    id: 'x1o31tr9-238q-9s08-r9p7-u49v5w90y421',
    text: 'When confronted with decision-making situations involving uncertainty, I typically adopt a cautious, "wait-and-see" posture in order to minimize the probability of making costly decisions',
    keyed: 'minus',
    domain: 'E',
    facet: 2
  },
  {
    id: 'y2p42us0-349r-0t19-s0q8-v50w6x01z532',
    text: 'I prefer to study a problem thoroughly before deploying resources to solve it',
    keyed: 'minus',
    domain: 'E',
    facet: 2
  },
  
  // Dimension E: Entrepreneurial Orientation - Innovativeness (facet 3)
  {
    id: 'z3q53vt1-450s-1u20-t1r9-w61x7y12a643',
    text: 'In general, I favor a strong emphasis on the marketing of tried and true products and services as compared with an emphasis on R&D technological leadership, and innovations',
    keyed: 'minus',
    domain: 'E',
    facet: 3
  },
  {
    id: 'a4r64wu2-561t-2v31-u2s0-x72y8z23b754',
    text: 'I favor experimentation and original approaches to problem solving rather than imitating methods that other organizations have used for solving their problems',
    keyed: 'plus',
    domain: 'E',
    facet: 3
  },
  {
    id: 'b5s75xv3-672u-3w42-v3t1-y83z9a34c865',
    text: 'I prefer that our organization designs its own unique new processes and methods of productions rather than adapting methods and techniques that others have developed and proven',
    keyed: 'minus',
    domain: 'E',
    facet: 3
  }
]

export default questions
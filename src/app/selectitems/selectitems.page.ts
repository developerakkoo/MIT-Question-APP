import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selectitems',
  templateUrl: './selectitems.page.html',
  styleUrls: ['./selectitems.page.scss'],
})
export class SelectitemsPage implements OnInit {
  allItems:any = [
    {
      value:"Amorous",
      type: "p",
      id:1
    },
    {
      value:"Amicable",
      type: "p",
      id:2
    },
    {
      value:"Affectionate",
      type: "p",
      id:3
    },{
      value:"Acceptable",
      type: "p",
      id:4
    },{
      value:"Absorbed",
      type: "p",
      id:5
    },
    {
      value: "Amused",
      type: "p",
      id: 6
    },
    {
      value:"Anxiety-free",
      type: "p",
      id:7
    },{
      value:"Athletic",
      type: "p",
      id:8
    },{
      value:"Athletic",
      type: "p",
      id:9
    },{
      value:"Beautiful",
      type: "p",
      id:10
    },{
      value:"Beguiled",
      type: "p",
      id:11
    },
    {
      value:"Blessed",
      type: "p",
      id:12
    },{
      value:"Buff",
      type: "p",
      id:13
    },{
      value:"Busy",
      type: "p",
      id:14
    },{
      value:"Calm",
      type: "p",
      id:15
    },{
      value:"Carefree",
      type: "p",
      id:16
    },{
      value:"Charmed",
      type: "p",
      id:17
    },{
      value:"Charming",
      type: "p",
      id:18
    },{
      value:"Cheered-up",
      type: "p",
      id:19
    },{
      value:"Cheerful",
      type: "p",
      id:20
    },{
      value:"Committed",
      type: "p",
      id:21
    },{
      value:"Compelling",
      type: "p",
      id:22
    },{
      value:"Composed",
      type: "p",
      id:23
    },{
      value:"Confident",
      type: "p",
      id:24
    },{
      value:"Content",
      type: "p",
      id:25
    },{
      value:"Contented",
      type: "p",
      id:26
    },{
      value:"Controlling",
      type: "p",
      id:27
    },{
      value:"Convulsed",
      type: "p",
      id:28
    },{
      value:"Cordial",
      type: "p",
      id:29
    },{
      value:"Crazy",
      type: "p",
      id:30
    },{
      value:"Curious",
      type: "p",
      id:31
    },{
      value:"Delighted",
      type: "p",
      id:32
    },{
      value:"Determined",
      type: "p",
      id:33
    },{
      value:"Diverted",
      type: "p",
      id:34
    },{
      value:"Dominant",
      type: "p",
      id:35
    },{
      value:"Dreamy",
      type: "p",
      id:36
    },{
      value:"Dynamic",
      type: "p",
      id:37
    },{
      value:"Ecstatic",
      type: "p",
      id:38
    },{
      value:"Elated",
      type: "p",
      id:39
    },{
      value:"Engaged",
      type: "p",
      id:40
    },{
      value:"Entertained",
      type: "p",
      id:41
    },{
      value:"Erotic",
      type: "p",
      id:42
    },{
      value:"Euphoric",
      type: "p",
      id:43
    },{
      value:"Excited",
      type: "p",
      id:44
    },{
      value:"Exhilarated",
      type: "p",
      id:45
    },{
      value:"Flexible",
      type: "p",
      id:46
    },{
      value:"Fond",
      type: "p",
      id:47
    },
    {
      value:"Generous",
      type: "p",
      id:48
    },{
      value:"Glad",
      type: "p",
      id:49
    },{
      value:"Glowing",
      type: "p",
      id:50
    },{
      value:"Good",
      type: "p",
      id:51
    },{
      value:"Grateful",
      type: "p",
      id:52
    },{
      value:"Gratified",
      type: "p",
      id:53
    },{
      value:"Happy",
      type: "p",
      id:54
    },{
      value:"Hard",
      type: "p",
      id:55
    },{
      value:"Harmonious",
      type: "p",
      id:56
    },{
      value:"Herculean",
      type: "p",
      id:57
    },{
      value:"High-powered",
      type: "p",
      id:58
    },{
      value:"Hopeful",
      type: "p",
      id:59
    },{
      value:"Hot",
      type: "p",
      id:60
    },{
      value:"Humble",
      type: "p",
      id:61
    },{
      value:"Idealistic",
      type: "p",
      id:62
    },{
      value:"Illicit",
      type: "p",
      id:63
    },{
      value:"Important",
      type: "p",
      id:64
    },{
      value:"Inclined",
      type: "p",
      id:65
    },{
      value:"Influential",
      type: "p",
      id:66
    },{
      value:"Interested",
      type: "p",
      id:67
    },{
      value:"Intimate",
      type: "p",
      id:68
    },{
      value:"Intoxicating",
      type: "p",
      id:69
    },{
      value:"Involved",
      type: "p",
      id:70
    },{
      value:"Irresistible",
      type: "p",
      id:71
    },{
      value:"Isolated",
      type: "p",
      id:72
    },{
      value:"Joy",
      type: "p",
      id:73
    },{
      value:"Joyful",
      type: "p",
      id:74
    },{
      value:"Kind",
      type: "p",
      id:75
    },{
      value:"Lovable",
      type: "p",
      id:76
    },{
      value:"Lovely",
      type: "p",
      id:78
    },{
      value:"Lovesick",
      type: "p",
      id:79
    },{
      value:"Loving",
      type: "p",
      id:80
    },{
      value:"Lustful",
      type: "p",
      id:81
    },{
      value:"Manly",
      type: "p",
      id:82
    },{
      value:"Mighty",
      type: "p",
      id:83
    },{
      value:"Nice",
      type: "p",
      id:84
    },{
      value:"Optimistic",
      type: "p",
      id:85
    },{
      value:"Overjoyed",
      type: "p",
      id:86
    },{
      value:"Passionate",
      type: "p",
      id:87
    },{
      value:"Patient",
      type: "p",
      id:88
    },{
      value:"Persuasive",
      type: "p",
      id:89
    },{
      value:"Pleasant",
      type: "p",
      id:90
    },{
      value:"Pleased",
      type: "p",
      id:91
    },{
      value:"Powerful",
      type: "p",
      id:92
    },{
      value:"Preoccupied",
      type: "p",
      id:93
    },{
      value:"Productive",
      type: "p",
      id:94
    },{
      value:"Proud",
      type: "p",
      id:95
    },{
      value:"Quiet",
      type: "p",
      id:96
    },{
      value:"Radiant",
      type: "p",
      id:97
    },{
      value:"Regaled",
      type: "p",
      id:98
    },{
      value:"Relaxed",
      type: "p",
      id:99
    },{
      value:"Relieved",
      type: "p",
      id:100
    },{
      value:"Restful",
      type: "p",
      id:101
    },{
      value:"Ripped",
      type: "p",
      id:102
    },{
      value:"Romanticist",
      type: "p",
      id:103
    },{
      value:"Satisfied",
      type: "p",
      id:104
    }, 
    {
      value:"Secure",
      type: "p",
      id:105
    }, 
    {
      value:"Self-accepting",
      type: "p",
      id:106
    }, 
    {
      value:"Self-approving",
      type: "p",
      id:107
    }, 
    {
      value:"Serene",
      type: "p",
      id:108
    }, 
    {
      value:"Shredded",
      type: "p",
      id:109
    }, 
    {
      value:"Shy",
      type: "p",
      id:110
    }, 
    {
      value:"Smug",
      type: "p",
      id:111
    }, 
    {
      value:"Solid",
      type: "p",
      id:112
    }, 
    {
      value:"Soothed",
      type: "p",
      id:113
    }, 
    {
      value:"Spirituous",
      type: "p",
      id:114
    }, 
    {
      value:"Stable",
      type: "p",
      id:115
    }, 
    {
      value:"Stiff",
      type: "p",
      id:116
    }, 
    {
      value:"Strong",
      type: "p",
      id:117
    }, 
    {
      value:"Sturdy",
      type: "p",
      id:118
    }, 
    {
      value:"Superior",
      type: "p",
      id:119
    }, 
    {
      value:"Surprised",
      type: "p",
      id:120
    }, 
    {
      value:"Thankful",
      type: "p",
      id:121
    }, 
    {
      value:"Thoughtful",
      type: "p",
      id:122
    }, 
    {
      value:"Thrilled",
      type: "p",
      id:123
    }, 
    {
      value:"Thunderous",
      type: "p",
      id:124
    }, 
    {
      value:"Tolerant",
      type: "p",
      id:125
    }, 
    {
      value:"Tough",
      type: "p",
      id:126
    }, 
    {
      value:"Tranquil",
      type: "p",
      id:127
    }, 
    {
      value:"Undisturbed",
      type: "p",
      id:128
    }, 
    {
      value:"Untroubled",
      type: "p",
      id:129
    }, 
    {
      value:"Unworried",
      type: "p",
      id:130
    }, 
    {
      value:"Vigorous",
      type: "p",
      id:131
    }, 
    {
      value:"Well-built",
      type: "p",
      id:132
    }, 
    {
      value:"Well-pleased",
      type: "p",
      id:133
    }, 
    {
      value:"Wowed",
      type: "p",
      id:134
    }, 
    {
      value:"Other positive feeling",
      type: "p",
      id:135
    }, 
    //END OF POSITIVE WORDS

    // START OF NEGATIVE WORDS
    {
      value:"Afraid",
      type: "n",
      id:136
    }, 
    {
      value:"Alarmed",
      type: "n",
      id:137
    }, 
    {
      value:"Angry",
      type: "n",
      id:138
    }, 
    {
      value:"Annoyed",
      type: "n",
      id:139
    }, 
    {
      value:"Agitated",
      type: "n",
      id:140
    }, 
    {
      value:"Anxious",
      type: "n",
      id:141
    }, 
    {
      value:"Appalled",
      type: "n",
      id:47
    }, 
    {
      value:"Apprehensive",
      type: "n",
      id:142
    }, 
    {
      value:"Ashamed",
      type: "n",
      id:143
    }, 
    {
      value:"Awful",
      type: "n",
      id:144
    }, 
    {
      value:"Bad",
      type: "n",
      id:145
    }, 
    {
      value:"Bad-tempered",
      type: "n",
      id:146
    }, 
    {
      value:"Bashful",
      type: "n",
      id:147
    }, 
    {
      value:"Blue",
      type: "n",
      id:148
    }, 
    {
      value:"Bored",
      type: "n",
      id:149
    }, 
    {
      value:"Broken-hearted",
      type: "n",
      id:150
    }, 
    {
      value:"Bummer",
      type: "n",
      id:151
    }, 
    {
      value:"Cold",
      type: "n",
      id:152
    }, 
    {
      value:"Conceited",
      type: "n",
      id:153
    }, 
    {
      value:"Confused",
      type: "n",
      id:154
    }, 
    {
      value:"Crabby",
      type: "n",
      id:155
    }, 
    {
      value:"Cross",
      type: "n",
      id:156
    }, 
    {
      value:"Depressed",
      type: "n",
      id:157
    }, 
    {
      value:"Diffident",
      type: "n",
      id:158
    }, 
    {
      value:"Disgusted",
      type: "n",
      id:159
    }, 
    {
      value:"Disinterested",
      type: "n",
      id:160
    }, 
    {
      value:"Dismayed",
      type: "n",
      id:161
    }, 
    {
      value:"Displeased",
      type: "n",
      id:162
    }, 
    {
      value:"Dissatisfied",
      type: "n",
      id:163
    }, 
    {
      value:"Doleful",
      type: "n",
      id:164
    }, 
    {
      value:"Doubtful",
      type: "n",
      id:165
    }, 
    {
      value:"Down",
      type: "n",
      id:166
    }, 
    {
      value:"Downhearted",
      type: "n",
      id:167
    }, 
    {
      value:"Dull",
      type: "n",
      id:168
    }, 
    {
      value:"Embarrassed",
      type: "n",
      id:169
    }, 
    {
      value:"Enraged",
      type: "n",
      id:170
    }, 
    {
      value:"Envious",
      type: "n",
      id:171
    }, 
    {
      value:"Exasperated",
      type: "n",
      id:172
    }, 
    {
      value:"Fatigued",
      type: "n",
      id:173
    }, 
    {
      value:"Fearful",
      type: "n",
      id:174
    }, 
    {
      value:"Flat",
      type: "n",
      id:175
    }, 
    {
      value:"Frantic",
      type: "n",
      id:176
    }, 
    {
      value:"Frightened",
      type: "n",
      id:177
    }, 
    {
      value:"Frustrated",
      type: "n",
      id:178
    }, 
    {
      value:"Fuming",
      type: "n",
      id:179
    }, 
    {
      value:"Furious",
      type: "n",
      id:180
    }, 
    {
      value:"Gloomy",
      type: "n",
      id:181
    }, 
    {
      value:"Glum",
      type: "n",
      id:182
    }, 
    {
      value:"Grossed-out",
      type: "n",
      id:183
    }, 
    {
      value:"Guilty",
      type: "n",
      id:184
    }, 
    {
      value:"Heartbroken",
      type: "n",
      id:185
    }, 
    {
      value:"Hesitant",
      type: "n",
      id:186
    }, 
    {
      value:"Horrified",
      type: "n",
      id:187
    }, 
    {
      value:"Hot",
      type: "n",
      id:188
    }, 
    {
      value:"Hungry",
      type: "n",
      id:189
    }, 
    {
      value:"Hot-headed",
      type: "n",
      id:190
    }, 
    {
      value:"Hot-tempered",
      type: "n",
      id:200
    }, 
    {
      value:"Hurt",
      type: "n",
      id:201
    }, 
    {
      value:"Hysterical",
      type: "n",
      id:202
    }, 
    {
      value:"Impatient",
      type: "n",
      id:203
    }, 
    {
      value:"Inattentive",
      type: "n",
      id:204
    }, 
    {
      value:"Indecisive",
      type: "n",
      id:205
    }, 
    {
      value:"Indifferent",
      type: "n",
      id:206
    }, 
    {
      value:"Inhibited",
      type: "n",
      id:207
    }, 
    {
      value:"Intimidated",
      type: "n",
      id:208
    }, 
    {
      value:"Intolerant",
      type: "n",
      id:209
    }, 
    {
      value:"Introverted",
      type: "n",
      id:210
    }, 
    {
      value:"Irritated",
      type: "n",
      id:301
    }, 
    {
      value:"Jealous",
      type: "n",
      id:302
    }, 
    {
      value:"Jittery",
      type: "n",
      id:303
    }, 
    {
      value:"Jumpy",
      type: "n",
      id:304
    }, 
    {
      value:"Lifeless",
      type: "n",
      id:305
    }, 
    {
      value:"Lonely",
      type: "n",
      id:306
    }, 
    {
      value:"Low-spirited",
      type: "n",
      id:307
    }, 
    {
      value:"Mad",
      type: "n",
      id:308
    }, 
    {
      value:"Miserable",
      type: "n",
      id:309
    }, 
    {
      value:"Monotonous",
      type: "n",
      id:310
    }, 
    {
      value:"Mournful",
      type: "n",
      id:401
    }, 
    {
      value:"Nasty",
      type: "n",
      id:402
    }, 
    {
      value:"Nauseated",
      type: "n",
      id:403
    }, 
    {
      value:"Needy",
      type: "n",
      id:404
    }, 
    {
      value:"Nervous",
      type: "n",
      id:405
    }, 
    {
      value:"Offended",
      type: "n",
      id:406
    }, 
    {
      value:"Outraged",
      type: "n",
      id:407
    }, 
    {
      value:"Pained",
      type: "n",
      id:408
    }, 
    {
      value:"Panicky",
      type: "n",
      id:409
    }, 
    {
      value:"Passive",
      type: "n",
      id:410
    }, 
    {
      value:"Petrified",
      type: "n",
      id:501
    }, 
    {
      value:"Pitiful",
      type: "n",
      id:502
    }, 
    {
      value:"Provoked",
      type: "n",
      id:503
    }, 
    {
      value:"Puzzled",
      type: "n",
      id:504
    }, 
    {
      value:"Raging",
      type: "n",
      id:505
    }, 
    {
      value:"Regretful",
      type: "n",
      id:506
    }, 
    {
      value:"Repelled",
      type: "n",
      id:507
    }, 
    {
      value:"Resentful",
      type: "n",
      id:508
    }, 
    {
      value:"Revolted",
      type: "n",
      id:509
    }, 
    {
      value:"Rigid",
      type: "n",
      id:510
    }, 
    {
      value:"Sad",
      type: "n",
      id:601
    }, 
    {
      value:"Scared",
      type: "n",
      id:602
    },  {
      value:"Self-conscious",
      type: "n",
      id:603
    },  {
      value:"Self-doubting",
      type: "n",
      id:604
    },  {
      value:"Shaky",
      type: "n",
      id:605
    },  {
      value:"Shocked",
      type: "n",
      id:606
    },  {
      value:"Shy",
      type: "n",
      id:607
    },  {
      value:"Sick",
      type: "n",
      id:608
    },  {
      value:"Sickened",
      type: "n",
      id:609
    },  {
      value:"Skeptical",
      type: "n",
      id:610
    },  {
      value:"Sleepy",
      type: "n",
      id:701
    },  {
      value:"Small",
      type: "n",
      id:702
    },  {
      value:"Smug",
      type: "n",
      id:703
    },  {
      value:"Sorrowful",
      type: "n",
      id:704
    },  {
      value:"Sorry",
      type: "n",
      id:705
    },  {
      value:"Spiritless",
      type: "n",
      id:706
    },  {
      value:"Spooked",
      type: "n",
      id:707
    },  {
      value:"Stale",
      type: "n",
      id:708
    },  {
      value:"Stodgy",
      type: "n",
      id:709
    },  {
      value:"Stressed",
      type: "n",
      id:710
    },  {
      value:"Stubborn",
      type: "n",
      id:801
    },  {
      value:"Stuffy",
      type: "n",
      id:802
    },  {
      value:"Stupid",
      type: "n",
      id:803
    },  {
      value:"Suspicious",
      type: "n",
      id:804
    },  {
      value:"Tamed",
      type: "n",
      id:805
    },  {
      value:"Tedious",
      type: "n",
      id:806
    },  {
      value:"Thirsty",
      type: "n",
      id:807
    },  {
      value:"Terrified",
      type: "n",
      id:808
    },  {
      value:"Timid",
      type: "n",
      id:809
    },  {
      value:"Tired",
      type: "n",
      id:810
    },  {
      value:"Tiresome",
      type: "n",
      id:901
    },  {
      value:"Tiring",
      type: "n",
      id:902
    },  {
      value:"Trashed",
      type: "n",
      id:903
    },  {
      value:"Ugly",
      type: "n",
      id:904
    },  {
      value:"Unassertive",
      type: "n",
      id:905
    },  {
      value:"Uncertain",
      type: "n",
      id:906
    },  {
      value:"Unconfident",
      type: "n",
      id:907
    },  {
      value:"Unfortunate",
      type: "n",
      id:908
    },  {
      value:"Unhappy",
      type: "n",
      id:909
    },  {
      value:"Unsure",
      type: "n",
      id:910
    },  {
      value:"Unwanted",
      type: "n",
      id:1001
    },  {
      value:"Used",
      type: "n",
      id:1002
    },  {
      value:"Violated",
      type: "n",
      id:1003
    },  {
      value:"Waspish",
      type: "n",
      id:1004
    },  {
      value:"Withdrawn",
      type: "n",
      id:1005
    },  {
      value:"Worried",
      type: "n",
      id:1006
    },  {
      value:"Wrathful",
      type: "n",
      id:1007
    },  {
      value:"Other negative feeling",
      type: "n",
      id:1008
    }, 
  ];

  userFilter: any = { value: '' };
 @Input() tag:string;
  constructor(private modalController: ModalController,
              private route: ActivatedRoute) {
         
                
              }

  ngOnInit() {
  }
  onDismissByValue(value){
    this.modalController.dismiss(value);
  }

  onDismiss(){
    this.modalController.dismiss();
  }
}

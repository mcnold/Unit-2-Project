const express = require('express')
const router = express.Router()
const Card = require('../models/card')
router.use(express.static('public'))
//custom middleware to require authentication
const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.send('You must be logged in to do that.')
    }
}
// set up index for cards 
router.get('/', (req, res) => {
  Card.find({}, (err, allCards) => {
    console.log(allCards[0])
    res.render('index.ejs', {
      card: allCards
    })
  })

})

// set up New ROUTE "new.ejs"
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

router.get('/seed', (req, res) => {

  Card.create([
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg",
      name: "The Fool",
      value: 0,
      value_int: 0,
      suit: "None",
      meaning_up: "Folly, mania, extravagance, intoxication, delirium, frenzy.",
      meaning_rev: "Negligence, absence, distribution, carelessness, apathy, vanity.",
      desc: "With light step, as if earth and its trammels had little power to restrain him, a young man in gorgeous vestments pauses at the brink of a precipice among the great heights of the world; he surveys the blue distance before him-its expanse of sky rather than the prospect below. His act of eager walking is still indicated, though he is stationary at the given moment; his dog is still bounding. The edge which opens on the depth has no terror; it is as if angels were waiting to uphold him, if it came about that he leaped from the height. His countenance is full of intelligence and expectant dream. He has a rose in one hand and in the other a costly wand, from which depends over his right shoulder a wallet curiously embroidered. He is a prince of the other world on his travels through this one-all amidst the morning glory, in the keen air. The sun, which shines behind him, knows whence he came, whither he is going, and how he will return by another path after many days. He is the spirit in search of experience. Many symbols of the Instituted Mysteries are summarized in this card, which reverses, under high warrants, all the confusions that have preceded it. In his Manual of Cartomancy, Grand Orient has a curious suggestion of the office of Mystic Fool, as apart of his process in higher divination; but it might call for more than ordinary gifts to put it into operation. We shall see how the card fares according to the common arts of fortune-telling, and it will be an example, to those who can discern, of the fact, otherwise so evident, that the Trumps Major had no place originally in the arts of psychic gambling, when cards are used as the counters and pretexts. Of the circumstances under which this art arose we know, however, very little. The conventional explanations say that the Fool signifies the flesh, the sensitive life, and by a peculiar satire its subsidiary name was at one time the alchemist, as depicting folly at the most insensate stage."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
      name: "The Magician",
      value: 1,
      value_int: 1,
      suit: "None",
      meaning_up: "Skill, diplomacy, subtlety, sickness, pain, loss, disaster, self confidence, will.",
      meaning_rev: "Physician, Magus, mental disease, disgrace, disquiet.",
      desc: "A youthful figure in the robe of a magician, having the countenance of divine Apollo, with smile of confidence and shining eyes. Above his head is the mysterious sign of the Holy Spirit, the sign of life, like an endless cord, forming the figure 8 in a horizontal position. About his waist is a serpent-cincture, the serpent appearing to devour its own tail. This is familiar to most as a conventional symbol of eternity, but here it indicates more especially the eternity of attainment in the spirit. In the Magician's right hand is a wand raised towards heaven, while the left hand is pointing to the earth. This dual sign is known in very high grades of the Instituted Mysteries; it shews the descent of grace, virtue and light, drawn from things above and derived to things below. The suggestion throughout is therefore the possession and communication of the Powers and Gifts of the Spirit. On the table in front of the Magician are the symbols of the four Tarot suits, signifying the elements of natural life, which lie like counters before the adept, and he adapts them as he wills. Beneath are roses and lilies, the flos campi and lilium convallium, changed into garden flowers, to shew the culture of aspiration. This card signifies the divine motive in man, reflecting God, the will in the liberation of its union with that which is above. It is also the unity of individual being on all planes."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg",
      name: "The High Priestess",
      value: 2,
      value_int: 2,
      suit: "None",
      meaning_up: "Secrets, mystery, the future as yet unrevealed, silence, tenacity, mystery, wisdom, science.",
      meaning_rev: "Passion, moral or physical ardour, conceit, surface knowledge",
      desc: "She has the lunar crescent at her feet, a horned diadem on her head, with a globe in the middle place, and a large solar cross on her breast. The scroll in her hands is inscribed with the word Tora, signifying the Greater Law, the Secret Law and the second sense of the Word. It is partly covered by her mantle, to shew that some things are implied and some spoken. She is seated between the white and black pillars--J. and B.--of the mystic Temple, and the veil of the Temple is behind her: it is embroidered with palms and pomegranates. The vestments are flowing and gauzy, and the mantle suggests light--a shimmering radiance. She has been called occult Science on the threshold of the Sanctuary of Isis, but she is really the Secret Church, the House which is of God and man. She is the spiritual Bride and Mother, the daughter of the stars and the Higher Garden of Eden. She is the Queen of the borrowed light, but this is the light of all. She is the bright reflection. She is the supernal understanding which reflects to the emanations that are beneath."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/d/d2/RWS_Tarot_03_Empress.jpg",
      name: "The Empress",
      value: 3,
      value_int: 3,
      suit: "None",
      meaning_up: "Fruitfulness, action, initiative, length of days, the unknown, difficulty, doubt, ignorance.",
      meaning_rev: "Light, truth, the unravelling of involved matters, public rejoicings",
      desc: "A stately figure, seated, having rich vestments and royal aspect, as of a daughter of heaven and earth. Her diadem is of twelve stars, gathered in a cluster. The symbol of Venus is on the shield which rests near her. A field of corn is ripening in front of her, and beyond there is a fall of water. The sceptre which she bears is surmounted by the globe of this world. She is the inferior Garden of Eden, the Earthly Paradise, all that is symbolized by the visible house of man. She is the fruitful mother of thousands. The card of the Empress signifies the door or gate by which an entrance is obtained into this life, as into the Garden of Venus; and then the way which leads out therefrom, into that which is beyond, is the secret known to the High Priestess: it is communicated by her to the elect."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg",
      name: "The Emperor",
      value: 4,
      value_int: 4,
      suit: "None",
      meaning_up: "Stability, power, protection, realization; a great person; aid, reason, conviction; also authority and will.",
      meaning_rev: "Benevolence, compassion, credit; also confusion to enemies, obstruction, immaturity.",
      desc: "He has a form of the Crux ansata for his sceptre and a globe in his left hand. He is a crowned monarch--commanding, stately, seated on a throne, the arms of which axe fronted by rams' heads. He is executive and realization, the power of this world, here clothed with the highest of its natural attributes. He is the virile power, to which the Empress responds, and in this sense is he who seeks to remove the Veil of Isis; yet she remains virgo intacta. It should be understood that this card and that of the Empress do not precisely represent the condition of married life, though this state is implied. He represents the higher kingship, occupying the intellectual throne."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/8/8d/RWS_Tarot_05_Hierophant.jpg",
      name: "The Hierophant",
      value: 5,
      value_int: 5,
      suit: "None",
      meaning_up: "Marriage, alliance, captivity, servitude; by another account, mercy and goodness; inspiration",
      meaning_rev: "Society, good understanding, overkindness, weakness.",
      desc: "He wears the triple crown and is seated between two pillars, but they are not those of the Temple which is guarded by the High Priestess. In his left hand he holds a sceptre terminating in the triple cross, and with his right hand he gives the well-known ecclesiastical sign which is called that of esotericism, distinguishing between the manifest and concealed part of doctrine. It is noticeable in this connexion that the High Priestess makes no sign. At his feet are the crossed keys, and two priestly ministers in albs kneel before him. He has been usually called the Pope, which is a particular application of the more general office that he symbolizes. He is the ruling power of external religion, as the High Priestess is the prevailing genius of the esoteric, withdrawn power. The Hierophant is the power of the keys, exoteric orthodox doctrine, and the outer side of the life which leads to the doctrine. As such, he is the channel of grace belonging to the world of institution as distinct from that of Nature, and he is the leader of salvation for the human race at large. He is the order and the head of the recognized hierarchy, which is the reflection of another and greater hierarchic order."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
      name: "The Lovers",
      value: 6,
      value_int: 6,
      suit: "None",
      meaning_up: "Attraction, love, beauty, trials overcome.",
      meaning_rev: "Failure, foolish designs.",
      desc: "The sun shines in the zenith, and beneath is a great winged figure with arms extended, pouring down influences. In the foreground are two human figures, male and female, unveiled before each other, as if Adam and Eve when they first occupied the paradise of the earthly body. Behind the man is the Tree of Life, bearing twelve fruits, and the Tree of the Knowledge of Good and Evil is behind the woman; the serpent is twining round it. The figures suggest youth, virginity, innocence and love before it is contaminated by gross material desire. This is in all simplicity the card of human love, here exhibited as part of the way, the truth and the life. In a very high sense, the card is a mystery of the Covenant and Sabbath."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
      name: "The Chariot",
      value: 7,
      value_int: 7,
      suit: "None",
      meaning_up: "Triumph, presumption, war, vengeance, trouble",
      meaning_rev: "Riot, dispute, litigation, defeat",
      desc: "An erect and princely figure carrying a drawn sword and corresponding, broadly speaking, to the traditional description which I have given in the first part. On the shoulders of the victorious hero are supposed to be the Urim and Thummim. He has led captivity captive; he is conquest on all planes--in the mind, in science, in progress, in certain trials of initiation. He has thus replied to the sphinx. He is above all things triumph of the mind. The tests of initiation through which he has passed in triumph are to be understood physically or rationally. If he came to the pillars of that Temple between which the High Priestess is seated, he could not open the scroll called Tora, nor if she questioned him could he answer. He is not hereditary royalty and he is not priesthood."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
      name: "Strength",
      value: 8,
      value_int: 8,
      suit: "None",
      meaning_up: "Power, energy, action, courage, magnanimity; also complete success and honors.",
      meaning_rev: "Despotism, abuse if power, weakness, discord, sometimes even disgrace.",
      desc: "A woman, over whose head there broods the same symbol of life which we have seen in the card of the Magician, is closing the jaws of a lion. Her beneficent fortitude has already subdued the lion, which is being led by a chain of flowers. Strength, in one of its most exalted aspects, is connected with the Divine Mystery of Union; the virtue, of course, operates in all planes, and hence draws on all in its symbolism. The card has nothing to do with self-confidence in the ordinary sense, though this has been suggested--but it concerns the confidence of those whose strength is God, who have found their refuge in Him. There is one aspect in which the lion signifies the passions, and she who is called Strength is the higher nature in its liberation."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/4/4d/RWS_Tarot_09_Hermit.jpg",
      name: "The Hermit",
      value: 9,
      value_int: 9,
      suit: "None",
      meaning_up: "Prudence, circumspection, treason, dissimulation, roguery, corruption.",
      meaning_rev: "Concealment, disguise, policy, fear, unreasoned caution.",
      desc: "The lamp is not enveloped partially in the mantle of its bearer, who blends the idea of the Ancient of Days with the Light of the World. It is a star which shines in the lantern. This is a card of attainment, and to extend this conception the figure is seen holding up his beacon on an eminence. The Hermit is not a wise man in search of truth and justice. His beacon actually intimates that \"Where I am, You may also Be.\""
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
      name: "The Wheel of Fortune",
      value: 10,
      value_int: 10,
      suit: "None",
      meaning_up: "Destiny, fortune, success, elevation, luck, felicity.",
      meaning_rev: "Increase, abundance, superfluity.",
      desc: "the symbolic picture stands for the perpetual motion of a fluidic universe and for the flux of human life. The Sphinx is the equilibrium therein. The transliteration of Taro as Rota is inscribed on the wheel, counterchanged with the letters of the Divine Name--to shew that Providence is imbued through all. But this is the Divine intention within, and the similar intention without is exemplified by the four Living Creatures. Sometimes the sphinx is represented couchant on a pedestal above, which defrauds the symbolism by stultifying the essential idea of stability amidst movement. Behind the general notion expressed in the symbol, there lies the denial of chance and the fatality which is implied therein."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/e/e0/RWS_Tarot_11_Justice.jpg",
      name: "Justice",
      value: 11,
      value_int: 11,
      suit: "None",
      meaning_up: "Equity, rightness, executive; triumph of the deserving side in law.",
      meaning_rev: "Law in all its departments, legal complications, bigotry, bias, excessive severity.",
      desc: "The figure is seated between pillars, like the High Priestess, and on this account it seems desirable to indicate that the moral principle which deals unto every man according to his works--while, of course, it is in strict analogy with higher things;--differs in its essence from the spiritual justice which is involved in the idea of election. The latter belongs to a mysterious order of Providence, in virtue of which it is possible for certain men to conceive the idea of dedication to the highest things. The operation of this is like the breathing of the Spirit where it wills, and we have no canon of criticism or ground of explanation concerning it. It is analogous to the possession of the fairy gifts and the high gifts and the gracious gifts of the poet: we have them or have not, and their presence is as much a mystery as their absence. The law of Justice is not however involved by either alternative. In conclusion, the pillars of Justice open into one world and the pillars of the High Priestess into another."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
      name: "The Hanged Man",
      value: 12,
      value_int: 12,
      suit: "None",
      meaning_up: "Wisdom, circumspection, discernment, trials, sacrifice, intuition, divination, prophecy.",
      meaning_rev: "Selfishness, the crowd, body politic.",
      desc: "The gallows from which he is suspended forms a Tau cross, while the figure--from the position of the legs--forms a fylfot cross. There is a nimbus about the head of the seeming martyr. It should be noted (1) that the tree of sacrifice is living wood, with leaves thereon; (2) that the face expresses deep entrancement, not suffering; (3) that the figure, as a whole, suggests life in suspension, but life and not death. It is a card of profound significance, but all the significance is veiled. it expresses the relation, in one of its aspects, between the Divine and the Universe.\nHe who can understand that the story of his higher nature is imbedded in this symbolism will receive intimations concerning a great awakening that is possible, and will know that after the sacred Mystery of Death there is a glorious Mystery of Resurrection."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg",
      name: "Death",
      value: 13,
      value_int: 13,
      suit: "None",
      meaning_up: "End, mortality, destruction, corruption also, for a man, the loss of a benefactor for a woman, many contrarieties; for a maid, failure of marriage projects.",
      meaning_rev: "Inertia, sleep, lethargy, petrifaction, somnambulism; hope destroyed.",
      desc: "The veil or mask of life is perpetuated in change, transformation and passage from lower to higher, and this is more fitly represented in the rectified Tarot by one of the apocalyptic visions than by the crude notion of the reaping skeleton. Behind it lies the whole world of ascent in the spirit. The mysterious horseman moves slowly, bearing a black banner emblazoned with the Mystic Rose, which signifies life. Between two pillars on the verge of the horizon there shines the sun of immortality. The horseman carries no visible weapon, but king and child and maiden fall before him. The natural transit of man to the next stage of his being either is or may be one form of his progress, but the exotic and almost unknown entrance, while still in this life, into the state of mystical death is a change in the form of consciousness and the passage into a state to which ordinary death is neither the path nor gate. The existing occult explanations of the 13th card are, on the whole, better than usual, rebirth, creation, destination, renewal, and the rest."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/f/f8/RWS_Tarot_14_Temperance.jpg",
      name: "Temperance",
      value: 14,
      value_int: 14,
      suit: "None",
      meaning_up: "Economy, moderation, frugality, management, accommodation.",
      meaning_rev: "Things connected with churches, religions, sects, the priesthood, disunion, unfortunate combinations, competing interests.",
      desc: "A winged angel, with the sign of the sun upon his forehead and on his breast the square and triangle of the septenary. It is held to be pouring the essences of life from chalice to chalice. It has one foot upon the earth and one upon waters, thus illustrating the nature of the essences. A direct path goes up to certain heights on the verge of the horizon, and above there is a great light, through which a crown is seen vaguely. Hereof is some part of the Secret of Eternal Life, as it is possible to man in his incarnation. It is called Temperance fantastically, because, when the rule of it obtains in our consciousness, it tempers, combines and harmonises the psychic and material natures. Under that rule we know in our rational part something of whence we came and whither we are going."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/5/55/RWS_Tarot_15_Devil.jpg",
      name: "The Devil",
      value: 15,
      value_int: 15,
      suit: "None",
      meaning_up: "Ravage, violence, vehemence, extraordinary efforts, force, fatality; that which is predestined but is not for this reason evil.",
      meaning_rev: "Evil fatality, weakness, pettiness, blindness.",
      desc: "The Horned Goat of Mendes, with wings like those of a bat, is standing on an altar. At the pit of the stomach there is the sign of Mercury. The right hand is upraised and extended, being the reverse of that benediction which is given by the Hierophant in the fifth card. In the left hand there is a great flaming torch, inverted towards the earth. A reversed pentagram is on the forehead. There is a ring in front of the altar, from which two chains are carried to the necks of two figures, male and female. These are analogous with those of the fifth card, as if Adam and Eve after the Fall. Hereof is the chain and fatality of the material life. The figures are tailed, to signify the animal nature, but there is human intelligence in the faces, and he who is exalted above them is not to be their master for ever. Even now, he is also a bondsman, sustained by the evil that is in him and blind to the liberty of service. It signifies the Dweller on the Threshold without the Mystical Garden when those are driven forth therefrom who have eaten the forbidden fruit."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
      name: "The Tower",
      value: 16,
      value_int: 16,
      suit: "None",
      meaning_up: "Misery, distress, indigence, adversity, calamity, disgrace, deception, ruin. It is a card in particular of unforeseen catastrophe.",
      meaning_rev: "According to one account, the same in a lesser degree also oppression, imprisonment, tyranny.",
      desc: "it is the downfall of the mind, seeking to penetrate the mystery of God. It is more correctly a question of analogy; one is concerned with the fall into the material and animal state, while the other signifies destruction on the intellectual side. The Tower has been spoken of as the chastisement of pride and the intellect overwhelmed in the attempt to penetrate the Mystery of God."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg",
      name: "The Star",
      value: 17,
      value_int: 17,
      suit: "None",
      meaning_up: "Loss, theft, privation, abandonment; hope and bright prospects.",
      meaning_rev: "Arrogance, haughtiness, impotence.",
      desc: "A great, radiant star of eight rays, surrounded by seven lesser stars--also of eight rays. The female figure in the foreground is entirely naked. Her left knee is on the land and her right foot upon the water. She pours Water of Life from two great ewers, irrigating sea and land. Behind her is rising ground and on the right a shrub or tree, whereon a bird alights. The figure expresses eternal youth and beauty. On other planes it has been certified as immortality and interior light. For the majority of prepared minds, the figure will appear as the type of Truth unveiled, glorious in undying beauty, pouring on the waters of the soul some part and measure of her priceless possession."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/7/7f/RWS_Tarot_18_Moon.jpg",
      name: "The Moon",
      value: 18,
      value_int: 18,
      suit: "None",
      meaning_up: "Hidden enemies, danger, calumny, darkness, terror, deception, occult forces, error.",
      meaning_rev: "Instability, inconstancy, silence, lesser degrees of deception and error.",
      desc: "The distinction between this card and some of the conventional types is that the moon is increasing on what is called the side of mercy, to the right of the observer. It has sixteen chief and sixteen secondary rays. The card represents life of the imagination apart from life of the spirit. The path between the towers is the issue into the unknown. The dog and wolf are the fears of the natural mind in the presence of that place of exit, when there is only reflected light to guide it. The intellectual light is a reflection and beyond it is the unknown mystery which it cannot shew forth. It illuminates our animal nature, the dog, the wolf and that which comes up out of the deeps, the nameless and hideous tendency which is lower than the savage beast. It strives to attain manifestation, symbolized by crawling from the abyss of water to the land, but as a rule it sinks back whence it came."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg",
      name: "The Sun",
      value: 19,
      value_int: 19,
      suit: "None",
      meaning_up: "Material happiness, fortunate marriage, contentment.",
      meaning_rev: "The same in a lesser sense.",
      desc: "The naked child mounted on a white horse and displaying a red standard has been mentioned already as the better symbolism connected with this card. It is the destiny of the Supernatural East and the great and holy light which goes before the endless procession of humanity, coming out from the walled garden of the sensitive life and passing on the journey home. The card signifies, therefore, the transit from the manifest light of this world, represented by the glorious sun of earth, to the light of the world to come, which goes before aspiration and is typified by the heart of a child. The sun is that of consciousness in the spirit - the direct as the antithesis of the reflected light. The characteristic type of humanity has become a little child therein--a child in the sense of simplicity and innocence in the sense of wisdom. In that simplicity, he bears the seal of Nature and of Art; in that innocence, he signifies the restored world."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/d/dd/RWS_Tarot_20_Judgement.jpg",
      name: "Judgment",
      value: 20,
      value_int: 20,
      suit: "None",
      meaning_up: "Change of position, renewal, outcome. Another account specifies total loss though lawsuit.",
      meaning_rev: "Weakness, simplicity, deliberation, decision, sentence.",
      desc: "The great angel is here encompassed by clouds, but he blows his bannered trumpet, and the cross as usual is displayed on the banner. The dead are rising from their tombs--a woman on the right, a man on the left hand, and between them their child, whose back is turned. It should be noted that all the figures are as one in the wonder, adoration and ecstacy expressed by their attitudes. It is the card which registers the accomplishment of the great work of transformation. It has been called a card of eternal life."
    },
    {
      deck: "Rider-Waite",
      type: "Major",
      img: "https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg",
      name: "The World",
      value: 21,
      value_int: 21,
      suit: "None",
      meaning_up: "Assured success, recompense, voyage, route, emigration, flight, change of place.",
      meaning_rev: "Inertia, fixity, stagnation, permanence.",
      desc: "As this final message of the Major Trumps is unchanged--and indeed unchangeable--in respect of its design, it has been partly described already regarding its deeper sense. It represents also the perfection and end of the Cosmos, the secret which is within it, the rapture of the universe when it understands itself in God. It is further the state of the soul in the consciousness of Divine Vision, reflected from the self-knowing spirit."
    },
  ], (err, data) => {
    console.log(data)
    if (err) {
      console.log(err)
    }
    res.redirect('/card')
  })
})


// set up show route 
router.get('/:id', (req, res) => {
  Card.findById(req.params.id, (error, foundCard) => {
    console.log(foundCard)
    res.render('show.ejs', { card: foundCard })
  })
})


// POST ROUTE "Create"
router.post('/', (req, res) => {
    if(req.session.currentUser) {
  console.log(req.body)
  Card.create(req.body, (error, createdCard) => {
    if (error){
      console.log(error)
      res.send(error)
    } else {
      console.log(createdCard)
      res.redirect('/card')
    }
  })
} else {
    res.send("Please log in to your account.")
}
})
// DELETE route
router.delete('/:id', authRequired, (req, res) => {
  Card.findByIdAndDelete(req.params.id, (error, deletedCard) => {
    // findByIdAndDelete will delete a document with a given id
    if (error) {
      console.log(error)
      res.send(error)
    } else {
     // redirect to the index page if the delete successful
     res.redirect('/card')
    }
  })
})

// make an edit page and a route to it
// create an edit.ejs view
// link to the edit page from each of the Cards
router.get('/:id/edit', authRequired, (req, res) => {
  Card.findById(req.params.id, (error, foundCard) => {
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      // make the edit form show the existing data
      res.render('edit.ejs', {
        card: foundCard,
      })
    }
  })
})

router.put('/:id', (req, res) => {
  // let's make our route actually update the model
  Card.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {
      new: true,
    },
    (error, updatedCard) => {
      // findByIdAndUpdate updates a fruit with a given id
      // the new option means we want the update fruit
      // without this flag, we'll get the fruit as it was
      // before the update

      if (error) {
        console.log(error)
        res.send(error)
      } else {
        // redirect to the index route
        res.redirect('/card')
      }
    } )
})

router.get('/signout', (req, res) => {
    req.session.destroy()
    //this destroys the session
    res.redirect('/card')
})


module.exports = router
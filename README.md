<h1 align="center">
Triple Triad
</h1>

<p align="center">
  <a href="https://github.com/dustinstacy/triple-triad-reactjs/issues">
    <img src="https://img.shields.io/badge/Issues-5-yellow" alt="Issues">
  </a>
   <a href="#license">
    <img src="https://img.shields.io/badge/License-MIT-brightgreen" alt="License">
  </a>
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#rules">Rules</a> •
  <a href="#planned-updates">Planned Updates</a> •
  <a href="#local-setup">Local Setup</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

---

![match screen](https://www.thedustinstacy.com/static/media/triad.059953b9c512112c1e39.png)

Website: <https://tripletriad.herokuapp.com/>

## Description

This web app is a playable card game that allows users to collect and upgrade
cards, construct a deck, and compete in various game modes. Based on the
eponymous [minigame](https://finalfantasy.fandom.com/wiki/Triple_Triad) from
Final Fantasy VIII, I was inspired to recreate it and give it a modern twist.
Progress is ongoing, with numerous planned updates in the near future to enhance
the user experience, add features, and increase replayability.

In it's current iteration, users can create an account, construct a deck, view
their collection, open and purchase packs using currency collected from winning
matches, and play a match against a AI opponent built using a heuristic
customized for average difficulty.

## Rules

Triple Triad is played on a 3x3 grid of blank spaces where the cards will be
placed. Each card has four ranks placed along each side. The ranks range from
one to ten, with the letter A representing ten. The top left corner of the card
has an elemental symbol representing the card's element. Each card will also
have a background color to signal which player the card belongs to.

In a basic game, each player is dealt 5 cards from a constructed 35 card deck
(35 being ideal for up to 7 round matches). A coin-flip decides who begins. The
player who wins the coin toss may choose a card to play anywhere on the grid.
After the first card is played, the opponent may play a card on any unoccupied
space on the board. The game continues with players' turns alternating. Each
player may play only one card per turn.

To win, a majority of the total ten cards played (including the one card that is
not placed on the board) must be of the player's card color. To capture a card,
the active player places a card adjacent to the opponent's card. If the rank
touching the opponent's card is higher, the opponent's card will be captured and
flipped into the active player's background color. The player who goes second
will have a card remaining in their hand and that card will count towards their
ending score.

## Planned Updates

- Peer to Peer matches
- Level up rewards
- Card enhancements
- Constructed challenges
- Expanded Ruleset
- Multiple Difficulties

## Local Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and
[Node.js](https://nodejs.org/en/download/) (which comes with
[npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/dustinstacy/triple-triad-reactjs.git

# Go into the repository
cd triple-triad-reactjs

# Install dependencies
npm install

# Run the app
npm start
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

Huge thanks to the following content providers: </br> </br> Character Artwork -
AEkashics <https://www.patreon.com/aekashics/posts> </br> Elements, Ranks, and
Misc. Icons - Upkylak <https://www.freepik.com/author/upklyak> </br>
Backgrounds - Sebastian Luca <https://www.artstation.com/bast>, Li Shuxing
<https://www.artstation.com/shuxingli> </br> </br> This content is for
non-commercial use. Any intent to redistribute or commericalize this content
must be done through the consent of the artist and/or membership privileges
where applicable.

## License

The MIT License (MIT)

Copyright (c) 2023 Dustin Stacy

#!/usr/bin/env python3
# -*- coding: utf8 -*-

from models.gameboard import GameBoard
from models.deck import Deck, Card
from models.player import Player

def main():
  pass


# if __name__ == "__main__":
#   main()



if __name__ == "__main__":

  import time,os, random
  players = [
    Player(),
    Player(),
  ]
  b = GameBoard((5,5), stone_n=0,players=players)

  os.system("clear")
  b.draw(use_borders=False)
  p = 0
  current_player = players[p]
  while True :
    b.move_player(current_player, random.choice(Card.ORIENTATIONS[0:-1]))
    p += 1
    current_player = players[p % 2]
    print("----")
    import os
    time.sleep(0.1)
    os.system("clear")
    b.draw(use_borders=False)

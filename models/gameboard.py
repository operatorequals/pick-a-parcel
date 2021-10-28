#!/usr/bin/env python3
# -*- coding: utf8 -*-

import random

# https://pypi.org/project/board/
# https://github.com/tjguk/dojo-board/blob/6eb075c2ea44942b75f916566ae318f0e408ff40/board.py
import board

from deck import Card
from player import Player


class GameBoard(board.Board):
  STONE = "#"
  WORMHOLE = "@" # Not implemented TODO
  PARCEL = "O"
  DESTINATION = "X"

  def __init__(self, *args, stone_n = 5, parcel_n = 1,
                players = [Player(), Player()], **kwargs):
    super().__init__(*args, **kwargs)

    for i in range(stone_n):
      self.__set_random(GameBoard.STONE)

    for i in range(parcel_n):
      self.__set_random(GameBoard.PARCEL)

    self.destination = self.__set_random(GameBoard.DESTINATION)

    self.__players = players
    self.__player_positions = {}
    for i,p in enumerate(players):
      player_num = i+1
      self.__players[i].symbol = f"-{player_num}-"
      self.__players[i].name = str(player_num)
      pos = self.__set_random(self.__players[i].symbol)
      self.__player_positions[p] = pos


  def __set_random(self, block):
    while True:
      x = random.randint(0,len(self.dimensions[0])-1)
      y = random.randint(0,len(self.dimensions[1])-1)
      if self[x,y] == board.Empty:
        break
    self[x,y] = block
    return x, y


  def __move_block(self, pos, new_pos):
    if new_pos not in self:
      return False
    if self[pos] == board.Empty:
      return False

    self[new_pos] = self[pos]
    del self[pos]
    return True

  def move_player(self, player, orientation):
    if orientation not in Card.ORIENTATIONS:
      raise ValueError(f"Player movement must be in {Card.ORIENTATIONS}")

    if player not in self.__player_positions.keys():
      raise ValueError("Player does not exist in current board")

    pos = self.__player_positions[player]
    if orientation == "up":
      new_pos = pos[0], pos[1] - 1
    elif orientation == "down":
      new_pos = pos[0], pos[1] + 1
    elif orientation == "left":
      new_pos = pos[0] - 1, pos[1]
    elif orientation == "right":
      new_pos = pos[0] + 1, pos[1]

    # New position out-of-bounds of the board
    if new_pos not in self:
      return False

    # Winning Condition!
    if new_pos == self.destination:
      if player.has_parcel:
        raise Exception(f"Player {player} Wins!")

    # New position finds an obstacle
    if self[new_pos] in [GameBoard.STONE, GameBoard.DESTINATION]:
      return False

    # A player stands in the new position
    if self[new_pos] in [p.symbol for p in self.__players]:
      return False

    if self[new_pos] == GameBoard.PARCEL:
      player.get_parcel()


    # If moved keep the new player position
    if self.__move_block(pos, new_pos):
      self.__player_positions[player] = new_pos
      self[new_pos] = player.symbol
      return True
    return False


if __name__ == "__main__":

  import time,os
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

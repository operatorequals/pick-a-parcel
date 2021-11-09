#!/usr/bin/python
# -*- coding: utf8 -*-

import random

HAND_NUMBER = 7

class Card:

  ORIENTATIONS = ["up", "down", "left", "right", None]
  ORIENT_SYMBOLS = ["⬆", "⬇", "⬅", "➡"]
  ACTIONS = ["move", "throw", "fetch"]

  def __init__(self, action, orientation=None):
    if orientation not in Card.ORIENTATIONS:
      raise IllegalArgumentException(f"Unknown orientation '{orientation}'")
    if action not in Card.ACTIONS:
      raise IllegalArgumentException(f"Unknown orientation '{action}'")
    
    if action == Card.ACTIONS[0] and orientation == None:
      raise IllegalArgumentException("'move' card needs an orientation")
    if action != Card.ACTIONS[0] and orientation != None:
      raise IllegalArgumentException("'action' card cannot have orientation")

    self.orientation = orientation
    self.action = action

  def __repr__(self):
    if self.action == Card.ACTIONS[0]:
      i = Card.ORIENTATIONS.index(self.orientation)
      return Card.ORIENT_SYMBOLS[i]
    if self.action == Card.ACTIONS[1]:
      return "T"
    if self.action == Card.ACTIONS[2]:
      return "F"


class Deck:

  def __init__(self, move_n = 32, throw_n = 6, fetch_n = 4):
    if move_n % 4 != 0:
      raise IllegalArgumentException("Number of movement cards needs to be dividable by 4")

    self.move_n = move_n
    self.throw_n = throw_n
    self.fetch_n = fetch_n

    self.create_deck()
    # self.__next__ = self.__deck.__next__
    # self.__iter__ = self.__deck.__iter__

  def create_deck(self):
    self.__deck = []
    # Create the deck
    for i in range(self.move_n):
      # Deal an orientation card in the deck for all orientations
      c = Card(action = Card.ACTIONS[0], orientation=Card.ORIENTATIONS[i%4])
      self.__deck.append(c)

    for i in range(self.throw_n):
      c = Card(action=Card.ACTIONS[1])
      self.__deck.append(c)

    for i in range(self.fetch_n):
      c = Card(action=Card.ACTIONS[2])
      self.__deck.append(c)

  def reshuffle(self):
    self.create_deck()

  def shuffle(self):
    random.shuffle(self.__deck)

  def deal(self, n=HAND_NUMBER):
    if len(self) < n:
      raise IllegalArgumentException(f"Not enough cards in Deck: ({len(self)})")
    dealt = []
    for i in range(n):
      dealt.append(self.__deck.pop())
    return dealt

  def sufficient_for_hands(self, player_n = 3, n=HAND_NUMBER):
    return player_n * n <= len(self)

  def __len__(self): return len(self.__deck)

  # def __next__(self):

  #   if self.__deck_pointer >= len(self.__deck):
  #     raise StopIteration
  #   c = self.__deck[self.__deck_pointer]
  #   self.__deck_pointer += 1
  #   return c

  # def __iter__(self):
  #   self.__deck_pointer = 0
  #   return self



if __name__ == "__main__":
  d = Deck()
  d.shuffle()



  print (len(d))
  hand = d.deal(7)
  for c in hand:
    print(c)
  print (len(d))

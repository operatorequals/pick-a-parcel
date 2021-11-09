
class Player:
  def __init__(self, name=None):
    self.name = name
    self.symbol = ""
    self.__has_parcel = False

  def get_parcel(self):
    self.__has_parcel = True
    self.symbol = f"({self.symbol})".replace("-","")

  def lose_parcel(self):
    self.__has_parcel = False
    self.symbol = f"-{self.symbol[1:-1]}-"

  def has_parcel(self):
    return self.__has_parcel

  def __repr__(self):
    return self.name

  def get_hand(deck_hand):
    self.current_hand = deck_hand
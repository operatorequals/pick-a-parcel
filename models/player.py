


class Player:
  def __init__(self, name=None):
    self.name = name
    self.has_parcel = False
    self.symbol = ""

  def get_parcel(self):
    self.has_parcel = True
    self.symbol = f"({self.symbol})".replace("-","")

  def lose_parcel(self):
    self.has_parcel = False
    self.symbol = f"-{self.symbol[1:-1]}-"

  def __repr__(self):
    return self.name
#Murilo Farias 2025-03-05

class Pet:
    def __init__(self, name, species, age, happiness=50):
        self.name = name
        self.species = species
        self.age = age
        self.happiness = happiness

    def feed(self):
        self.happiness = self.happiness + 10
        return "%s has been fed! Happiness level: %s" % (self.name, self.happiness)
    
    def play(self):
        self.happiness = self.happiness + 20
        return "%s is playing! Happiness level: %s" % (self.name, self.happiness)
    
    def sleep(self):
        self.happiness = self.happiness + 5
        return "%s is sleeping. Happiness level: %s" % (self.name, self.happiness)
    
    def describe(self):
        return "%s is a %s and is %s years old. Happiness level: %s" % (self.name, self.species, self.age, self.happiness)
    
 #instances = Objects
Turtle = Pet("Mel", "Turtle", 300, 50)
Fish = Pet("Brown", "Fish", 2, 50)

print(Turtle.describe())
print(Fish.describe())
print(Turtle.feed())
print(Fish.play())
print(Turtle.sleep()) 
print(Turtle.describe())
print(Fish.describe())




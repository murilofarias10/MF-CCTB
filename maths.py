
class Maths:
    def __init__(self, numer1, numer2, operator):
        self.numer1 = numer1
        self.numer2 = numer2
        self.operator = operator

    def get_result(self):
        if self.operator == "Add":
            print(self.numer1 + self.numer2)
        if self.operator == "Sub":
            print(self.numer1 - self.numer2)

class Calculate:
    def __init__(self):
        pass

    def add(self, numer1, numer2):
        print(numer1 + numer2)
    
    def sub(self, numer1, numer2):
        print(numer1 - numer2)


maths = Maths(7, 8, "Add")
maths.get_result()
calculate = Calculate()
calculate.add(7, 8)


maths = Maths(15, 10, "Sub")
maths.get_result()

calculate = Calculate()
calculate.sub(15, 10)
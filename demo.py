class ParentClass:
    def __init__(self):
        pass

    def add(self, firt_operand, second_operand):
        print(firt_operand+second_operand)

    def sub(self, first_operand, second_operand):
        print(first_operand - second_operand)


class ChildClass(ParentClass):
    def __init__(self):
        pass


pc = ParentClass()

pc.add(7,8)

child = ChildClass()
child.add(10,10)

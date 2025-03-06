
from library import Library
from student import Student

            #instances = Objects
first_test_student = Student(123, "First Student")
first_library = Library(111, "First Library")


print(first_test_student)
print(first_library)
print(first_library.id, first_library.name)
print("\n")
print(Student(234, "Second student").student_details())
print(first_test_student.student_details())



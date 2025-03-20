#Murilo Farias
#New File student_scores
import os
if os.path.exists("student_scores"):
    os.remove("student_scores.txt")
else:
    print("File does not exist")

f = open("student_scores.txt", "w")
f.write("Name Score1 Score2 Score3\n")

f.close()

#Add information about student and grades
f = open("student_scores.txt", "a")
f.write("Alice 85 90 88\n")
f.write("Bob 78 82 80\n")
f.write("Charlie 92 95 89\n")
f.close()

#Create a copy of original datas
import shutil
shutil.copyfile("student_scores.txt", "student_scores_copy.txt")

#validation of datas:
f = open("student_scores_copy.txt", "r")
line_number = 1  
for line in f:
    print("Linha", line_number, ":", line.strip())
    line_number += 1  
f.close()


#Add names in a dictionary and validate
f = open("student_scores_copy.txt", "r")
table_1 = {}
next(f)
for line in f:
    headers = line.split()[0]
    table_1[headers] = []  
print(table_1)
f.close()

#Add grades in a dictionary
f = open("student_scores_copy.txt", "r")
next(f)
for line in f:
    headers = line.split()
    names = headers[0]  
    scores = [int(score) for score in headers[1:]]  # lambda
    average = round(sum(scores) / len(scores),2)
    table_1[names] = average  

#validate names and grades
print(table_1.keys())
print(table_1.values())


#creating the final txt
if os.path.exists("student_averages.txt"):
    os.remove("student_averages.txt")
else:
    print("File does not exist")

#open and writing the headers
f = open("student_averages.txt", "a")
f.write("Name Average \n")
f.close

#open and adding the grades in string mode 
f = open("student_averages.txt", "a")
for i in table_1:
    print(i, table_1[i])
    f.write(i + " " + str(table_1[i]) + "\n")
    

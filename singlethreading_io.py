import time


def read(num):
    time.sleep(2)
    print(f"Reading file {num + 1}")


def square(num):
    print(f"Square of {num}: {num * num}")


start_time = time.time()

numbers = list(range(5))

for num in numbers:
    read(num)
    # square(num)

end_time = time.time()
print(f"\nDone in: {end_time - start_time}")

import py_compile
import sys

try:
    print(py_compile.compile(sys.argv[1]))
except IndexError as e:
    raise e

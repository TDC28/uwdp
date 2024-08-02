from ..course import Course
from ..reqs import XOf, AllOf

# TODO: Implement antirequisites


class MATH135(Course):
    def __init__(self):
        super().__init__("MATH135")


class MATH136(Course):
    def __init__(self):
        super().__init__("MATH136")
        self.prereqs = XOf([MATH135(), "Science Mathematical Physics"]) # TODO: Implement program checking


class MATH137(Course):
    def __init__(self):
        super().__init__("MATH137")


class MATH138(Course):
    def __init__(self):
        super().__init__("MATH138")
        self.prereqs = XOf([MATH137()])

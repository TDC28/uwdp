from ..course import Course
from ..reqs import XOf, AllOf
from ..program import Major

# TODO: Implement antirequisites


class MATH135(Course):
    def __init__(self):
        super().__init__("MATH135")


class MATH136(Course):
    def __init__(self):
        super().__init__(
            "MATH136", XOf([MATH135(), Major("Mathematical Physics", "Science")])
        )


class MATH137(Course):
    def __init__(self):
        super().__init__("MATH137")


class MATH138(Course):
    def __init__(self):
        super().__init__("MATH138")
        self.prereqs = XOf([MATH137()])

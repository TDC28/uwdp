class CourseList:
    """
    Represents requirements for a degree or course
    """

    def __init__(self):
        self.reqs = None

    def set_requirements(self, requirements):
        return NotImplemented

    def check_requirements(self):
        return NotImplemented


class AllOf(CourseList):
    """
    Docstring...
    """

    def __init__(self, reqs):
        self.reqs = reqs


class XOf(CourseList):
    """
    Docstring...
    """

    def __init__(self, reqs, x=1):
        self.reqs = reqs
        self.x = x

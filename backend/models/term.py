class Term:
    """
    A Termrepresents the courses enrolled in during a term at UW
    """

    def __init__(self, courses):
        self.courses = set(courses)

    def add_course(self, course):
        self.courses.add(course)
        return None

    def remove_course(self, course):
        self.courses.remove(course)
        return None

class Course:
    """
    A Course represents a course offered by UW. ...
    """

    def __init__(self, name, prereqs=None, antireqs=None):
        self.name = name
        self.prereqs = prereqs
        self.antireqs = antireqs

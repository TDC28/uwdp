class Course:
    """
    A Course represents a course offered by UW. ...
    """
    def __init__(self, name):
        self.name = name
        self.prereqs = None 
        self.antireqs = None

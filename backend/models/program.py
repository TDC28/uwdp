class Program:
    """
    A Program holds all information about a given university program.
    """

    def __init__(self, name):
        self.name = name
        self._requirements = None

    def set_requirements(self, requirements):
        self._requirements = requirements


class Major(Program):
    """
    ...
    """

    def __init__(self, name, faculty):
        super().__init__(name)
        self.faculty = faculty


class Minor(Program):
    """
    ...
    """

    pass


class Option(Program):
    """
    An option...
    """

    pass

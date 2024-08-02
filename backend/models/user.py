from .term import Term


class User:
    """
    A User object represents all the classes the user has taken throughout his studies at UW.
    """

    def __init__(self):
        self.terms = {year + term: Term([]) for year in "1234" for term in "AB"}
        self.existing_terms = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B"]

    def add_new_term(self):
        last_term = self.existing_terms[-1]

        if last_term[-1] == "B":
            new_term = str(int(last_term[0]) + 1) + "A"

        else:
            new_term = last_term[0] + "B"

        self.existing_terms.append(new_term)
        self.terms[new_term] = Term([])

        return None

    def remove_term(self):
        self.terms.pop(self.existing_terms.pop())

        return None

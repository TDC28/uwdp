import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <nav className="sticky">
      <MaxWidthWrapper>
        <div>
          <p className="text-lg font-bold">
            <span className="text-primary">UW</span>
            DP
          </p>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;

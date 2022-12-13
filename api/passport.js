const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/user.model");

//passort googlestrategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async function (accessToken, refreshToken, profile, done) {
            const { id, displayName, emails, photos } = profile;
            const { familyName, givenName } = profile.name;
            const email = emails[0].value;
            const image = photos[0].value;

            let user = await User.findOne({ where: { googleId: id } });
            if (user) {
                done(null, user);
            } else {
                user = await User.create({
                    googleId: id,
                    email: email,
                    firstName: givenName,
                    lastName: familyName,
                    image: image,
					role: "user",
                });
                done(null, user);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

//passort googlestrategy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, done) {
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			//   return cb(err, user);
			// });

			done(null, profile);
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

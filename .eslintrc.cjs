module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["airbnb", "prettier", "eslint:recommended"],
    "plugins": ["prettier"],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "prettier/prettier": ["error"] // if you choose to use prettier rules.
    },
};

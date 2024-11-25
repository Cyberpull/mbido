set -e

# ===========================
# Publish mbido
# ===========================

git config --global user.name "$ID_NAME"

git config --global user.email "$ID_EMAIL"

npm set //registry.npmjs.org/:_authToken $TOKEN

npm version $LIB_VERSION

npm publish --access public

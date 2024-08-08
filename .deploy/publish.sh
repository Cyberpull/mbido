set -e

# ===========================
# Publish NGSuite
# ===========================

npm set //registry.npmjs.org/:_authToken $TOKEN

npm version $LIB_VERSION

npm publish --access public

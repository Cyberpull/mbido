set -e

# ===========================
# Publish mbido
# ===========================

npm set //registry.npmjs.org/:_authToken $TOKEN

npm version $LIB_VERSION

npm publish --access public

//
//
// Main
//

const formatAsJsonString = (subject) => {
  const SPACES = 2;
  const UNUSED_PARAM = null;

  switch (typeof subject) {
    case "string":
      // Treat empty string as a special case
      if (subject === "") return `""`;
      // See if we can parse and re-stringify a JSON string
      try {
        return JSON.stringify(JSON.parse(subject), UNUSED_PARAM, SPACES);
      } catch (error) {
        // Oops, I guess not
        return subject;
      }

    case "object":
      try {
        return JSON.stringify(subject, UNUSED_PARAM, SPACES);
      } catch (error) {
        // Catch a circular JSON reference
        if (error instanceof TypeError) {
          const truncatedSubject = Object.keys(subject).reduce(
            (newSubject, key) => {
              const nextSubject = { ...newSubject };
              nextSubject[key] = String(subject[key]);
              return nextSubject;
            },
            {}
          );
          return formatAsJsonString(truncatedSubject);
        }
        throw error;
      }

    default:
      return String(subject);
  }
};

//
//
// Export
//

module.exports = formatAsJsonString;

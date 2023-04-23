module.exports = (postDetails) => {
  return {
    title: postDetails.title,
    text: [
      `I just published ${postDetails.title} ${postDetails.subtitle}`,
      postDetails.url,
      '#dev #javascript #nodejs #reactjs #typescript #webdev'
    ].join('\n\n'),
    thumbnailImageLink: postDetails.coverLink,
    thumbnailLink: postDetails.url
  };
};

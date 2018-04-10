import profileMarkup from './ProfileMarkup.js';
import repositoryMarkup from './RepositoryMarkup.js';
import renderMarkup from './RenderMarkup.js';

export default function userMarkup(data) {
    const markup = profileMarkup(data[0]) + repositoryMarkup(data[1]);
    return renderMarkup(markup);
}
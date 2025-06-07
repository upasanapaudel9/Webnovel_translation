import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ novelId, chapterNo = 0 }) => {


    const disqusShortname = 'collabtranslate'; // Disqus shortname
    const disqusConfig = {
        url: `http://localhost:5173/${novelId + chapterNo}`, // frontend URL (local development)
        identifier: `#${novelId + chapterNo}`, 
        title: `${novelId + chapterNo}`, 
    };

    return (
        <div>
            <h2>Comments</h2>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
    );
};

export default Comments;
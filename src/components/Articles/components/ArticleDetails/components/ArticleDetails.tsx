import React from 'react'

interface ArticleDetailsProps {
    article: any
}

export const ArticleDetails: React.FC<ArticleDetailsProps> = ({ article }) => {
    return (
        <div className="py-10">
            {article ? (
                <div className="">
                    <h1 className="text-4xl">{article.title}'s Article Details</h1>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

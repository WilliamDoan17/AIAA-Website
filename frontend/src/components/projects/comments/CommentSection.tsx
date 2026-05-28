import { useState, useMemo } from 'react'
import { useProjectPostComments, useCreateProjectPostComment } from '../../../hooks/projects/project-post-comments'
import { useProjectMembers } from '../../../hooks/projects/project-members'
import useAuth from '../../../hooks/useAuth'
import type { ProjectPostCommentDetail } from '../../../types/projects/project-post-comments'
import CommentCard from './CommentCard'
import ReplyForm from './ReplyForm'

interface CommentSectionProps {
  postId: string
  projectId: string
  memberId: string
}


const CommentSection = ({ postId, projectId, memberId }: CommentSectionProps) => {
  const { member } = useAuth()
  const { data: comments = [], isLoading } = useProjectPostComments(postId)
  const { data: projectMembers = [] } = useProjectMembers(projectId)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [newCommentError, setNewCommentError] = useState<string>()
  const { mutate: create, isPending: isPosting } = useCreateProjectPostComment()

  const isProjectAdmin = useMemo(
    () => projectMembers.some(m => m.member_id === memberId && m.role === 'admin'),
    [projectMembers, memberId]
  )
  const isClubAdmin = member?.role === 'admin'

  const canActOn = (comment: ProjectPostCommentDetail) =>
    comment.author_id === memberId || isProjectAdmin || isClubAdmin

  const topLevel = useMemo(() => comments.filter(c => !c.reply_to_id), [comments])

  const repliesMap = useMemo(() => {
    const map = new Map<string, ProjectPostCommentDetail[]>()
    comments.filter(c => c.reply_to_id).forEach(c => {
      const key = c.reply_to_id!
      map.set(key, [...(map.get(key) ?? []), c])
    })
    return map
  }, [comments])

  // DFS: returns all descendants of parentId in thread order, capped at maxDepth=2 visually
  const getAllDescendants = (parentId: string): ProjectPostCommentDetail[] => {
    const direct = repliesMap.get(parentId) ?? []
    return direct.flatMap(reply => [reply, ...getAllDescendants(reply.id)])
  }

  const handlePostComment = () => {
    if (!newComment.trim()) { setNewCommentError('Comment cannot be empty'); return }
    if (newComment.trim().length < 2 || newComment.trim().length > 2048) { setNewCommentError('Comment must be 2–2048 characters'); return }
    create(
      { post_id: postId, author_id: memberId, content: newComment.trim(), reply_to_id: null },
      { onSuccess: () => { setNewComment(''); setNewCommentError(undefined) } }
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-sm uppercase tracking-widest text-muted">
        Comments {comments.length > 0 && <span className="text-copy">({comments.length})</span>}
      </h2>

      {isLoading ? (
        <p className="text-muted font-body text-sm">Loading comments...</p>
      ) : topLevel.length === 0 ? (
        <p className="text-muted font-body text-sm">No comments yet. Be the first.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {topLevel.map(comment => (
            <div key={comment.id}>
              <CommentCard
                comment={comment}
                canAct={canActOn(comment)}
                onReply={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              />
              {replyingTo === comment.id && (
                <ReplyForm
                  postId={postId}
                  memberId={memberId}
                  replyToId={comment.id}
                  onClose={() => setReplyingTo(null)}
                />
              )}
              {getAllDescendants(comment.id).map(reply => (
                <div key={reply.id} className="mt-2">
                  <CommentCard
                    comment={reply}
                    canAct={canActOn(reply)}
                    onReply={() => setReplyingTo(replyingTo === reply.id ? null : reply.id)}
                    isIndented
                  />
                  {replyingTo === reply.id && (
                    <ReplyForm
                      postId={postId}
                      memberId={memberId}
                      replyToId={reply.id}
                      onClose={() => setReplyingTo(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-rim pt-6">
        <textarea
          rows={3}
          placeholder="Write a comment…"
          value={newComment}
          onChange={e => { setNewComment(e.target.value); setNewCommentError(undefined) }}
          className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm font-body text-copy placeholder-muted focus:outline-none transition-colors duration-200 resize-none ${newCommentError ? 'border-red-400' : 'border-rim focus:border-accent'}`}
        />
        {newCommentError && <p className="text-red-400 text-xs font-body">{newCommentError}</p>}
        <div className="flex justify-end">
          <button
            onClick={handlePostComment}
            disabled={isPosting}
            className="px-5 py-2 rounded-xl border border-accent text-accent text-xs font-display font-semibold uppercase tracking-widest disabled:opacity-50 transition-colors duration-200"
          >
            {isPosting ? 'Posting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentSection

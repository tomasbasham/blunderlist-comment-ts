import {
  CommentQuery,
  CommentResponse,
  CommentCreateRequest,
  CommentUpdateRequest
} from './blunderlist_comment_v1/comment_pb';

import { Pool, QueryResult } from 'pg';

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class Store {
  constructor(private db: Pool) { }

  async getComments(id: number): Promise<CommentResponse[]> {
    const result = await this.db.query('SELECT * FROM comments WHERE parent_id=$1 ORDER BY created_at', [id]);
    return result.rows.map(this.scan);
  }

  async getComment(id: number): Promise<CommentResponse> {
    const result = await this.db.query('SELECT * FROM comments WHERE id=$1', [id]);
    const comment = result.rows[0];

    return this.scan(comment);
  }

  async createComment(comment: CommentCreateRequest): Promise<CommentResponse> {
    const result = await this.db.query('INSERT INTO comments(parent_id, text, created_at) VALUES($1, $2, $3) RETURNING id', [comment.getText(), Date.now()]);
    return await this.getComment(result.rows[0].id)
  }

  async updateComment(comment: CommentUpdateRequest): Promise<CommentResponse> {
    const result = await this.db.query('UPDATE comments SET text=$1 WHERE id=$2 RETURNING id', [comment.getText(), comment.getId()]);
    return await this.getComment(result.rows[0].id)
  }

  async deleteComment(id: number): Promise<void> {
    await this.db.query('DELETE FROM comments WHERE id=$1', [id]);
  }

  async ping(): Promise<boolean> {
    const result = await this.db.query('SELECT 1');
    return !!result;
  }

  private scan(result: any): CommentResponse {
    const timestamp = new google_protobuf_timestamp_pb.Timestamp();
    timestamp.fromDate(result.created_at);

    const response = new CommentResponse();
    response.setId(result.id);
    response.setParentId(result.parent_id);
    response.setText(result.text.toUpperCase()); // The variant.
    response.setCreateTime(timestamp);

    return response;
  }
}

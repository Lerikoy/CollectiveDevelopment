"""Create new tables

Revision ID: 49cafe92495b
Revises: 9d6a53110afa
Create Date: 2024-04-11 17:27:19.398846

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '49cafe92495b'
down_revision: Union[str, None] = '9d6a53110afa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cosplay',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('fandom', sa.String(), nullable=True),
    sa.Column('name_character', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('picture',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('path_img', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('story',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('path_file', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('discipline')
    op.add_column('users', sa.Column('date_of_birth', sa.Date(), nullable=False))
    op.add_column('users', sa.Column('cosplay', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('story', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('picture', sa.Boolean(), nullable=True))
    op.add_column('users', sa.Column('consent_to_processing', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'consent_to_processing')
    op.drop_column('users', 'picture')
    op.drop_column('users', 'story')
    op.drop_column('users', 'cosplay')
    op.drop_column('users', 'date_of_birth')
    op.create_table('discipline',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('disc_name', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('video_path', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('img_path', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='discipline_user_id_fkey')
    )
    op.drop_table('story')
    op.drop_table('picture')
    op.drop_table('cosplay')
    # ### end Alembic commands ###

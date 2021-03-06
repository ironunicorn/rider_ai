"""empty message

Revision ID: e84f8a016510
Revises: 40aa3cafbe26
Create Date: 2016-07-05 13:22:02.416270

"""

# revision identifiers, used by Alembic.
revision = 'e84f8a016510'
down_revision = '40aa3cafbe26'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email_address', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=True),
    sa.Column('admin', sa.Boolean(), nullable=True),
    sa.Column('created_timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.alter_column(u'contacts', 'email_address',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.alter_column(u'contacts', 'message',
               existing_type=sa.TEXT(),
               nullable=False)
    op.alter_column(u'contacts', 'name',
               existing_type=sa.VARCHAR(),
               nullable=False)
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(u'contacts', 'name',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.alter_column(u'contacts', 'message',
               existing_type=sa.TEXT(),
               nullable=True)
    op.alter_column(u'contacts', 'email_address',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_table('user')
    ### end Alembic commands ###

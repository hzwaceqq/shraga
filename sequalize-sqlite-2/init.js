const sequelize = require('./db');
const { User, Post } = require('./models');

async function init() {
  try {
    await sequelize.sync({ force: true });
    console.log('Таблицы синхронизированы.');

    const user = await User.create({
      name: 'Андрей Смирнов',
      email: 'an213a@example.com',
    });

    await user.createPost({
      title: 'Первый пост',
      content: 'Знакомство',
    });

    const secondPost = await Post.create({
      title: 'Второй пост',
      content: 'Пост о чем то',
      authorId: user.id,
    });

    await user.addPost(secondPost);

    const userWithPosts = await User.findByPk(user.id, {
      include: [{
        model: Post,
        as: 'posts',
      }],
    });

    console.log('Пользователь со связанными постами:');
    console.dir(userWithPosts.toJSON(), { depth: null });

  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await sequelize.close();
  }
}

init();

import Card from './Card';
import CardLink from './CardLink';
import CardText from './CardText';
import CardTitle from './CardTitle';

export default Object.assign(Card, {
  Link: CardLink,
  Title: CardTitle,
  Text: CardText
});

type HeadingProps = {
    center?: boolean,
    title: string,
    subtitle: string
}

const Heading = ({ center, title, subtitle } : HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-left'}>
        <h1 className='text-lg md:text-xl font-semibold mb-2'>{title}</h1>
        <p className='text-gray-500'>{subtitle}</p>
    </div>
  );
};

export default Heading;
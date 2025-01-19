import React from 'react';
import { Row, Col, Typography, Space, Anchor, Divider } from 'antd';

import Left from '../components/Left';
import Content from '../components/Content';
import CodeArea from '../components/CodeArea';

import './index.less';

const { Text } = Typography;
const { Link } = Anchor;

const Index: React.FC = () => {
  return (
    <Row  gutter={16} className='api-study'>
      <Col className='api-study-left' span={4}>
        <Left>
          <Anchor affix={false}>
            <Link href="#A" title="A">
              <Link href="#a" title="a" />
              <Link href="#abbr" title="abbr" />
              <Link href="#acronym" title={<s>acronym</s>} />
              <Link href="#address" title="address" />
              <Link href="#applet" title="applet" />
              <Link href="#area" title="area" />
              <Link href="#article" title="article" />
              <Link href="#aside" title="aside" />
              <Link href="#audio" title="audio" />
            </Link>
            <Link href="#B" title="B">
              <Link href="#b" title="b" />
              <Link href="#base" title="base" />
              <Link href="#basefont" title="basefont" />
              <Link href="#bdi" title="bdi" />
              <Link href="#bdo" title="bdo" />
              <Link href="#bgsound" title="bgsound" />
              <Link href="#big" title="big" />
              <Link href="#blink" title="blink" />
              <Link href="#blockquote" title="blockquote" />
              <Link href="#body" title="body" />
              <Link href="#br" title="br" />
              <Link href="#button" title="button" />
            </Link>
            <Link href="#C" title="C">
              <Link href="#canvas" title="canvas" />
              <Link href="#caption" title="caption" />
              <Link href="#center" title="center" />
              <Link href="#cite" title="cite" />
              <Link href="#code" title="code" />
              <Link href="#col" title="col" />
              <Link href="#colgroup" title="colgroup" />
              <Link href="#content" title="content" />
            </Link>
            <Link href="#D" title="D">
              <Link href="#data" title="data" />
              <Link href="#datalist" title="datalist" />
              <Link href="#dd" title="dd" />
              <Link href="#del" title="del" />
              <Link href="#details" title="details" />
              <Link href="#dfn" title="dfn" />
              <Link href="#dialog" title="dialog" />
              <Link href="#dir" title="dir" />
              <Link href="#div" title="div" />
              <Link href="#dl" title="dl" />
              <Link href="#dt" title="dt" />
            </Link>
            <Link href="#E" title="E">
              <Link href="#em" title="em" />
              <Link href="#embed" title="embed" />
            </Link>
            <Link href="#F" title="F">
              <Link href="#fieldset" title="fieldset" />
              <Link href="#figcaption" title="figcaption" />
              <Link href="#figure" title="figure" />
              <Link href="#font" title="font" />
              <Link href="#footer" title="footer" />
              <Link href="#form" title="form" />
              <Link href="#frame" title="frame" />
              <Link href="#frameset" title="frameset" />
            </Link>
            <Link href="#G" title="G"></Link>
            <Link href="#H" title="H">
              <Link href="#h1>-<h6"  title="h1>-<h6" />
              <Link href="#head"  title="head" />
              <Link href="#header"  title="header" />
              <Link href="#hgroup"  title="hgroup" />
              <Link href="#hr"  title="hr" />
              <Link href="#html"  title="html" />
            </Link>
            <Link href="#I" title="I">
              <Link href="#i" title="i" />
              <Link href="#iframe" title="iframe" />
              <Link href="#img" title="img" />
              <Link href="#input" title="input" />
              <Link href="#ins" title="ins" />
            </Link>
            <Link href="#J" title="J"></Link>
            <Link href="#K" title="K">
              <Link href="#kbd" title="kbd" />
              <Link href="#keygen" title="keygen" />
            </Link>
            <Link href="#L" title="L">
              <Link href="#label" title="label" />
              <Link href="#legend" title="legend" />
              <Link href="#li" title="li" />
              <Link href="#link" title="link" />
            </Link>
            <Link href="#M" title="M">
              <Link href="#main" title="main" />
              <Link href="#map" title="map" />
              <Link href="#mark" title="mark" />
              <Link href="#marquee" title="marquee" />
              <Link href="#menu" title="menu" />
              <Link href="#menuitem" title="menuitem" />
              <Link href="#meta" title="meta" />
              <Link href="#meter" title="meter" />
            </Link>
            <Link href="#N" title="N">
              <Link href="#nav" title="nav" />
              <Link href="#nobr" title="nobr" />
              <Link href="#noframes" title="noframes" />
              <Link href="#noscript" title="noscript" />
            </Link>
            <Link href="#O" title="O">
              <Link href="#object" title="object" />
              <Link href="#ol" title="ol" />
              <Link href="#optgroup" title="optgroup" />
              <Link href="#option" title="option" />
              <Link href="#output" title="output" />
            </Link>
            <Link href="#P" title="P">
              <Link href="#p" title="p" />
              <Link href="#param" title="param" />
              <Link href="#picture" title="picture" />
              <Link href="#plaintext" title="plaintext" />
              <Link href="#pre" title="pre" />
              <Link href="#progress" title="progress" />
            </Link>
            <Link href="#Q" title="Q">
              <Link href="#q" title="q" />
            </Link>
            <Link href="#R" title="R">
              <Link href="#rp" title="rp" />
              <Link href="#rt" title="rt" />
              <Link href="#rtc" title="rtc" />
              <Link href="#ruby" title="ruby" />
            </Link>
            <Link href="#S" title="S">
              <Link href="#s" title="s" />
              <Link href="#samp" title="samp" />
              <Link href="#script" title="script" />
              <Link href="#section" title="section" />
              <Link href="#select" title="select" />
              <Link href="#shadow" title="shadow" />
              <Link href="#slot" title="slot" />
              <Link href="#small" title="small" />
              <Link href="#source" title="source" />
              <Link href="#spacer" title="spacer" />
              <Link href="#span" title="span" />
              <Link href="#strike" title="strike" />
              <Link href="#strong" title="strong" />
              <Link href="#style" title="style" />
              <Link href="#sub" title="sub" />
              <Link href="#summary" title="summary" />
              <Link href="#sup" title="sup" />
            </Link>
            <Link href="#T" title="T">
              <Link href="#table" title="table" />
              <Link href="#tbody" title="tbody" />
              <Link href="#td" title="td" />
              <Link href="#template" title="template" />
              <Link href="#textarea" title="textarea" />
              <Link href="#tfoot" title="tfoot" />
              <Link href="#th" title="th" />
              <Link href="#thead" title="thead" />
              <Link href="#time" title="time" />
              <Link href="#title" title="title" />
              <Link href="#tr" title="tr" />
              <Link href="#track" title="track" />
              <Link href="#tt" title="tt" />
            </Link>
            <Link href="#U" title="U">
              <Link href="#u" title="u" />
              <Link href="#ul" title="ul" />
            </Link>
            <Link href="#V" title="V">
              <Link href="#var" title="var" />
              <Link href="#video" title="video" />
            </Link>
            <Link href="#W" title="W">
              <Link href="#wbr" title="wbr" />
            </Link>
            <Link href="#X" title="X">
              <Link href="#xmp" title="xmp" />
            </Link>
            <Link href="#Y" title="Y"></Link>
            <Link href="#Z" title="Z"></Link>
          </Anchor>
        </Left>
      </Col>
      <Col className='api-study-content' span={20}>
        <Row className='api-study-content-top'>
          <Content>
            <Space direction="vertical">
              <Text id='a' mark>{`<a>`}</Text>
              <Text>锚元素</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<a href="https://example.com">Website</a>`}</Text>
              <Text type='success'>属性：</Text>
              <Text italic>
                <ol>
                  <li>download: 此属性指示浏览器下载 URL 而不是导航到它，因此将提示用户将其保存为本地文件。如果属性有一个值，那么此值将在下载保存过程中作为预填充的文件名（如果用户需要，仍然可以更改文件名）。此属性对允许的值没有限制，但是 / 和 \ 会被转换为下划线。大多数文件系统限制了文件名中的标点符号，故此，浏览器将相应地调整建议的文件名。
                    <ul>
                      <li>此属性仅适用于同源 URL。</li>
                      <li>尽管 HTTP URL 需要位于同一源中，但是可以使用 blob: URL 和 data: URL ，以方便用户下载使用 JavaScript 生成的内容（例如使用在线绘图 Web 应用程序创建的照片）。</li>
                      <li>如果 HTTP 头中的 Content-Disposition 属性赋予了一个不同于此属性的文件名，HTTP 头属性优先于此属性。</li>
                      <li>如果 HTTP 头属性 Content-Disposition 被设置为 inline（即 Content-Disposition='inline'），那么 Firefox 优先考虑 HTTP 头 Content-Dispositiondownload 属性。</li>
                    </ul>
                  </li>
                  <li>href: 包含超链接指向的 URL 或 URL 片段。</li>
                  <li>hreflang: 该属性用于指定链接文档的人类语言。</li>
                  <li>ping: 包含一个以空格分隔的 url 列表，当跟随超链接时，将由浏览器 (在后台) 发送带有正文 PING 的 POST 请求。通常用于跟踪。</li>
                  <li>referrerpolicy（实验性）: 表明在获取 URL 时发送哪个提交者（referrer）。
                    <ul>
                      <li>"no-referrer" 表示 Referer: 头将不会被发送。</li>
                      <li>"no-referrer-when-downgrade" 表示当从使用 HTTPS 的页面导航到不使用 TLS(HTTPS) 的来源 时不会发送 Referer: 头。如果没有指定策略，这将是用户代理的默认行为。</li>
                      <li>"origin" 表示 referrer 将会是页面的来源，大致为这样的组合：主机和端口（不包含具体的路径和参数的信息）。</li>
                      <li>"origin-when-cross-origin" 表示导航到其它源将会限制为这种组合：主机 + 端口，而导航到相同的源将会只包含 referrer 的路径。</li>
                      <li>'strict-origin-when-cross-origin'</li>
                      <li>"unsafe-url" 表示 referrer 将会包含源和路径（domain + path）（但是不包含密码或用户名的片段）。这种情况是不安全的，因为它可能会将安全的 URLs 数据泄露给不安全的源。</li>
                    </ul>
                  </li>
                  <li>rel: 指定了目标对象到链接对象的关系。</li>
                  <li>
                    <ul>
                      <li>target: 指定在何处显示链接的资源。</li>
                      <li>_self: 当前页面加载，即当前的响应到同一 HTML 4 frame（或 HTML5 浏览上下文）。此值是默认的，如果没有指定属性的话。</li>
                      <li>_blank: 新窗口打开，即到一个新的未命名的 HTML4 窗口或 HTML5 浏览器上下文</li>
                      <li>_parent: 加载响应到当前框架的 HTML4 父框架或当前的 HTML5 浏览上下文的父浏览上下文。如果没有 parent 框架或者浏览上下文，此选项的行为方式与 _self 相同。</li>
                      <li>_top: IHTML4 中：加载的响应成完整的，原来的窗口，取消所有其它 frame。 HTML5 中：加载响应进入顶层浏览上下文（即，浏览上下文，它是当前的一个的祖先，并且没有 parent）。如果没有 parent 框架或者浏览上下文，此选项的行为方式相同_self</li>
                    </ul>
                  </li>
                  <li>type: 指定在一个 MIME type 链接目标的形式的媒体类型。</li>
                  <li><s>charset</s></li>
                  <li><s>coords</s></li>
                  <li><s>name</s></li>
                  <li><s>rev</s></li>
                  <li><s>shape</s></li>
                </ol>
              </Text>
              <Divider />
              <Text id='abbr' mark>{`<abbr>`}</Text>
              <Text>用于代表缩写</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<abbr>CSS</abbr>`}</Text>
              <Divider />
              <Text id='acronym' mark>{`<acronym>`}</Text>
              <Text type="danger">已弃用</Text>
              <Divider />
              <Text id='address' mark>{`<address>`}</Text>
              <Text>表示其中的 HTML 提供了某个人或某个组织（等等）的联系信息。</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<address><a href="mailto:jim@rock.com">jim@rock.com</a><br><a href="tel:+13115552368">(311) 555-2368</a></address>`}</Text>
              <Divider />
              <Text id='applet' mark>{`<applet>`}</Text>
              <Text type="danger">已弃用</Text>
              <Divider />
              <Text id='area' mark>{`<area>`}</Text>
              <Text>在图片上定义一个热点区域，可以关联一个超链接。仅在map元素内部使用。</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<div style="color:#0000FF">这是一个在 div 元素中的文本。</div>`}</Text>
              <Divider />
              <Text id='article' mark>{`<article>`}</Text>
              <Text>div元素是流内容的通用容器</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<div style="color:#0000FF">这是一个在 div 元素中的文本。</div>`}</Text>
              <Divider />
              <Text id='aside' mark>{`<aside>`}</Text>
              <Text>div元素是流内容的通用容器</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<div style="color:#0000FF">这是一个在 div 元素中的文本。</div>`}</Text>
              <Divider />
              <Text id='audio' mark>{`<audio>`}</Text>
              <Text>div元素是流内容的通用容器</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<div style="color:#0000FF">这是一个在 div 元素中的文本。</div>`}</Text>
              <Divider />
              <Text id='div' mark>{`<div>`}</Text>
              <Text>div元素是流内容的通用容器</Text>
              <Text type='success'>用法：</Text>
              <Text code>{`<div style="color:#0000FF">这是一个在 div 元素中的文本。</div>`}</Text>
            </Space>
          </Content>
        </Row>
        <Row className='api-study-content-bottom'>
          <CodeArea />
        </Row>
      </Col>
    </Row>
  );
}

export default Index;
